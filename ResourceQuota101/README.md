# ResourceQuota101: Managing Resource Constraints in Kubernetes

## What are ResourceQuotas?

- ResourceQuotas provide constraints that limit aggregate resource consumption per namespace
- They enable cluster administrators to divide cluster resources between different teams or projects
- ResourceQuotas can limit the quantity of objects that can be created by type
- They can also limit the total amount of compute resources (CPU, memory) that may be consumed
- ResourceQuotas are namespace-scoped - each namespace can have its own quota

## Why Use ResourceQuotas?

ResourceQuotas solve several critical cluster management challenges:

- **Resource Fairness**: Prevent a single namespace from consuming all cluster resources
- **Cost Control**: Limit resource usage to control cloud costs
- **Capacity Planning**: Ensure resources are available for all tenants
- **Multi-tenancy**: Support multiple teams/projects on the same cluster
- **Prevent Resource Exhaustion**: Avoid situations where one application starves others

## What Can Be Limited with ResourceQuotas?

### Compute Resources
- CPU requests and limits
- Memory requests and limits
- Storage requests
- Ephemeral storage

### Object Counts
- Number of Pods
- Number of Services
- Number of ConfigMaps
- Number of Secrets
- Number of PersistentVolumeClaims
- Number of LoadBalancers
- Number of NodePorts

## Pre-requisite

- Running Kubernetes cluster with admin access
- kubectl configured
- Understanding of namespaces and resource requests/limits

## Creating Your First ResourceQuota

### Step 1: Create a Namespace

```bash
kubectl create namespace quota-demo
```

**Expected Output:**
```
namespace/quota-demo created
```

### Step 2: Create a Simple ResourceQuota

Save as `quota-basic.yaml`:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: basic-quota
  namespace: quota-demo
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "10"
```

Apply the quota:

```bash
kubectl apply -f quota-basic.yaml
```

**Expected Output:**
```
resourcequota/basic-quota created
```

### Step 3: Verify the ResourceQuota

```bash
kubectl get resourcequota -n quota-demo
```

**Expected Output:**
```
NAME          AGE   REQUEST                                             LIMIT
basic-quota   10s   pods: 0/10, requests.cpu: 0/4, requests.memory: 0/8Gi   limits.cpu: 0/8, limits.memory: 0/16Gi
```

View detailed information:

```bash
kubectl describe resourcequota basic-quota -n quota-demo
```

**Expected Output:**
```
Name:            basic-quota
Namespace:       quota-demo
Resource         Used  Hard
--------         ----  ----
limits.cpu       0     8
limits.memory    0     16Gi
pods             0     10
requests.cpu     0     4
requests.memory  0     8Gi
```

## Testing the ResourceQuota

### Create a Pod Without Resource Specifications

Save as `pod-no-resources.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: no-resources
  namespace: quota-demo
spec:
  containers:
  - name: nginx
    image: nginx:latest
```

Try to apply:

```bash
kubectl apply -f pod-no-resources.yaml
```

**Expected Output (Error):**
```
Error from server (Forbidden): error when creating "pod-no-resources.yaml": pods "no-resources" is forbidden: failed quota: basic-quota: must specify limits.cpu for: nginx; limits.memory for: nginx; requests.cpu for: nginx; requests.memory for: nginx
```

**Important**: When a ResourceQuota is active, all pods must specify resource requests and limits!

### Create a Pod With Resource Specifications

Save as `pod-with-resources.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-resources
  namespace: quota-demo
spec:
  containers:
  - name: nginx
    image: nginx:latest
    resources:
      requests:
        memory: "512Mi"
        cpu: "500m"
      limits:
        memory: "1Gi"
        cpu: "1"
```

Apply the pod:

```bash
kubectl apply -f pod-with-resources.yaml
```

**Expected Output:**
```
pod/with-resources created
```

Check the quota usage:

```bash
kubectl describe resourcequota basic-quota -n quota-demo
```

**Expected Output:**
```
Name:            basic-quota
Namespace:       quota-demo
Resource         Used   Hard
--------         ----   ----
limits.cpu       1      8
limits.memory    1Gi    16Gi
pods             1      10
requests.cpu     500m   4
requests.memory  512Mi  8Gi
```

## Real-World Example: Team Resource Allocation

Allocate resources for development, staging, and production environments:

### Development Namespace

Save as `quota-dev.yaml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"
    services: "20"
    persistentvolumeclaims: "20"
    requests.storage: "500Gi"
```

## Monitoring ResourceQuotas

### View All ResourceQuotas

```bash
kubectl get resourcequota --all-namespaces
```

### Check Quota Status

```bash
kubectl get resourcequota -n development -o yaml
```

### Watch Quota Usage

```bash
kubectl get resourcequota -n development --watch
```

## Best Practices

1. **Always Set ResourceQuotas in Multi-Tenant Clusters**: Prevent resource monopolization
2. **Use LimitRanges with ResourceQuotas**: Provide default values for pods
3. **Monitor Quota Usage**: Set up alerts when quotas are near limits
4. **Document Quotas**: Clearly communicate limits to development teams
5. **Regular Review**: Adjust quotas based on actual usage patterns
6. **Test Quota Limits**: Verify quotas work as expected before applying to production
7. **Consider Growth**: Set quotas with future growth in mind
8. **Use Metrics**: Base quota decisions on actual usage metrics

## Troubleshooting

### Check Why Pod Creation Failed

```bash
kubectl describe pod <pod-name> -n <namespace>
```

Look for quota-related errors in events.

### View Current Quota Usage

```bash
kubectl describe resourcequota -n <namespace>
```

### Check if Namespace Has Quotas

```bash
kubectl get resourcequota -n <namespace>
```

## Cleaning Up

Remove all resources created in this tutorial:

```bash
# Delete namespace (removes all resources within)
kubectl delete namespace quota-demo
```

## Quota vs LimitRange

| Feature | ResourceQuota | LimitRange |
|---------|---------------|------------|
| Scope | Namespace aggregate limits | Per-pod/container limits |
| Purpose | Control total resource usage | Control individual resource usage |
| Enforcement | Total across all resources | Per resource instance |
| Default Values | No | Yes |
| Use Case | Multi-tenancy, capacity planning | Prevent resource hogging |

## Next Steps

- Learn about LimitRanges for per-pod constraints
- Explore [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
- Check [Monitoring101](../Monitoring101/README.md) for tracking resource usage

## Contributors

[Ajeet Singh Raina](https://twitter.com/ajeetsraina)

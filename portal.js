document.addEventListener('DOMContentLoaded', function() {
    // Lab categories and structure based on the README
    const labCategories = [
        {
            name: 'Introduction',
            icon: 'fa-solid fa-book-open',
            items: [
                { title: 'Kubernetes Architecture', path: 'Kubernetes_Architecture.md' },
                { title: 'Kubectl for Docker Beginners', path: 'kubectl-for-docker.md' },
                { title: 'Accessing Kubernetes API', path: 'api.md' },
                { title: 'Runtime Detection', path: 'detect.md' }
            ]
        },
        {
            name: 'Cluster Setup',
            icon: 'fa-solid fa-server',
            items: [
                { title: 'Preparing 5-Node Kubernetes Cluster', path: 'kube101.md' },
                { title: 'Setting up GKE Cluster', path: 'gke-setup.md' },
                { title: 'Setting up Kubernetes on Ubuntu', path: 'install/ubuntu/README.md' },
                { title: 'Kubernetes with Docker Desktop for Mac', path: 'dockerdesktopformac/README.md' }
            ]
        },
        {
            name: 'Pods',
            icon: 'fa-solid fa-cubes',
            items: [
                { title: 'Deploying Your First Nginx Pod', path: 'pods101/deploy-your-first-nginx-pod.md' },
                { title: 'Labels and Selectors in a Pod', path: 'pods101/labels-and-selectors/README.md' },
                { title: 'Kubernetes Tools for Pods', path: 'pods101/tools/kubetail.md' }
            ]
        },
        {
            name: 'ReplicaSets',
            icon: 'fa-solid fa-copy',
            items: [
                { title: 'Creating Your First ReplicaSet', path: 'replicaset101/README.md' }
            ]
        },
        {
            name: 'Deployments',
            icon: 'fa-solid fa-rocket',
            items: [
                { title: 'Creating Your First Deployment', path: 'Deployment101/README.md' }
            ]
        },
        {
            name: 'ConfigMaps',
            icon: 'fa-solid fa-gear',
            items: [
                { title: 'What are ConfigMaps?', path: 'ConfigMaps101/what-are-configmaps.md' }
            ]
        },
        {
            name: 'Scheduler',
            icon: 'fa-solid fa-calendar',
            items: [
                { title: 'How Kubernetes Selects the Right node?', path: 'Scheduler101/README.md' },
                { title: 'Node Affinity', path: 'Scheduler101/node_affinity.md' },
                { title: 'Anti-Node Affinity', path: 'Scheduler101/Anti-Node-Affinity.md' },
                { title: 'Nodes taints and tolerations', path: 'Scheduler101/Nodes_taints_and_tolerations.md' }
            ]
        },
        {
            name: 'Services',
            icon: 'fa-solid fa-network-wired',
            items: [
                { title: 'Deploy a Kubernetes Service', path: 'Services101/README.md' }
            ]
        },
        {
            name: 'StatefulSets',
            icon: 'fa-solid fa-database',
            items: [
                { title: 'StatefulSet vs Deployment', path: 'StatefulSets101/README.md' }
            ]
        },
        {
            name: 'DaemonSets',
            icon: 'fa-solid fa-robot',
            items: [
                { title: 'Why DaemonSets in Kubernetes?', path: 'DaemonSet101/README.md' }
            ]
        },
        {
            name: 'Jobs',
            icon: 'fa-solid fa-briefcase',
            items: [
                { title: 'Creating Your First Kubernetes Job', path: 'Jobs101/README.md' }
            ]
        },
        {
            name: 'Ingress',
            icon: 'fa-solid fa-door-open',
            items: [
                { title: 'What is Kubernetes ingress?', path: 'Ingress101/README.md' },
                { title: 'Ingress with EKS', path: 'Ingress101/ingress-eks.md' }
            ]
        },
        {
            name: 'RBAC',
            icon: 'fa-solid fa-lock',
            items: [
                { title: 'Role-Based Access Control (RBAC) Overview', path: 'RBAC101/README.md' }
            ]
        },
        {
            name: 'Networking',
            icon: 'fa-solid fa-network-wired',
            items: [
                { title: 'Cluster Networking', path: 'ClusterNetworking101/README.md' },
                { title: 'Network Policies', path: 'Network_Policies101/README.md' }
            ]
        },
        {
            name: 'Observability',
            icon: 'fa-solid fa-chart-line',
            items: [
                { title: 'Monitoring in Kubernetes', path: 'Monitoring101/README.md' },
                { title: 'Logging Introduction', path: 'Logging101/logging-intro.md' },
                { title: 'Observability Tools', path: 'Observability101/observability.md' }
            ]
        },
        {
            name: 'Advanced Topics',
            icon: 'fa-solid fa-graduation-cap',
            items: [
                { title: 'Autoscaling', path: 'Autoscaler101/what-are-autoscalers.md' },
                { title: 'Helm Introduction', path: 'Helm101/what-is-helm.md' },
                { title: 'Security', path: 'Security101/devsecops.md' },
                { title: 'GitOps', path: 'GitOps101/what-is-gitops.md' },
                { title: 'Disaster Recovery', path: 'DisasterRecovery101/what-is-dr.md' }
            ]
        },
        {
            name: 'Cloud Providers',
            icon: 'fa-solid fa-cloud',
            items: [
                { title: 'AKS Introduction', path: 'AKS101/what-is-aks.md' },
                { title: 'EKS Introduction', path: 'EKS101/what-is-eks.md' },
                { title: 'GKE Introduction', path: 'GKE101/what-is-gke.md' },
                { title: 'LKE Introduction', path: 'LKE101/what-is-lke.md' }
            ]
        },
        {
            name: 'Kubernetes Tools',
            icon: 'fa-solid fa-toolbox',
            items: [
                { title: 'Loft Introduction', path: 'Loft101/what-is-loft.md' },
                { title: 'Shipa Introduction', path: 'Shipa101/what-is-shipa.md' },
                { title: 'DevSpace Introduction', path: 'DevSpace101/what-is-devspace.md' },
                { title: 'KubeSphere Introduction', path: 'KubeSphere/what-is-kubesphere.md' }
            ]
        },
        {
            name: 'DevOps Integration',
            icon: 'fa-solid fa-code-branch',
            items: [
                { title: 'Kubernetes with GitLab', path: 'GitLab101/kubernetes-with-gitlab.md' },
                { title: 'Jenkins on Kubernetes', path: 'Jenkins101/jenkins-on-kubernetes.md' },
                { title: 'Terraform Introduction', path: 'Terraform101/what-is-terraform.md' }
            ]
        },
        {
            name: 'Resources',
            icon: 'fa-solid fa-book',
            items: [
                { title: 'Kubernetes Cheat Sheet', path: 'Cheat Sheets/Kubernetes Cheat Sheet.md' },
                { title: 'Helm Cheat Sheet', path: 'Cheat Sheets/Helm Cheat Sheet.md' }
            ]
        }
    ];

    // DOM elements
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const contentArea = document.getElementById('content');
    const searchInput = document.getElementById('search-labs');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Build the sidebar menu
    function buildSidebar() {
        const sidebarHtml = document.createElement('ul');
        
        labCategories.forEach((category, categoryIndex) => {
            // Create category div
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.dataset.category = categoryIndex;
            
            // Create category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `
                <span><i class="${category.icon} category-icon"></i>${category.name}</span>
                <i class="fa-solid fa-chevron-down"></i>
            `;
            categoryHeader.addEventListener('click', () => toggleCategory(categoryDiv));
            
            // Create category items div
            const categoryItems = document.createElement('div');
            categoryItems.className = 'category-items';
            
            // Add each lab item
            category.items.forEach((item, itemIndex) => {
                const labItem = document.createElement('div');
                labItem.className = 'lab-item';
                labItem.textContent = item.title;
                labItem.dataset.path = item.path;
                labItem.dataset.category = categoryIndex;
                labItem.dataset.item = itemIndex;
                labItem.addEventListener('click', () => loadLabContent(item.path, labItem));
                categoryItems.appendChild(labItem);
            });
            
            // Assemble the category
            categoryDiv.appendChild(categoryHeader);
            categoryDiv.appendChild(categoryItems);
            sidebarHtml.appendChild(categoryDiv);
        });
        
        sidebarMenu.appendChild(sidebarHtml);
    }

    // Toggle category expand/collapse
    function toggleCategory(categoryDiv) {
        categoryDiv.classList.toggle('active');
        const icon = categoryDiv.querySelector('.category-header i:last-child');
        if (categoryDiv.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }

    // Load lab content from path (for use with onclick events)
    window.loadLabContentFromPath = function(path) {
        loadLabContent(path);
    };

    // Load lab content
    async function loadLabContent(path, labItem) {
        try {
            // First, remove active class from all lab items
            document.querySelectorAll('.lab-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            if (labItem) {
                labItem.classList.add('active');
            }
            
            // Show loading state
            contentArea.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading content...</div>';
            
            // Fetch content
            const response = await fetch(`https://raw.githubusercontent.com/ajeetraina/kubelabs/master/${path}`);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
            }
            
            const markdown = await response.text();
            
            // Convert markdown to HTML using our custom parser
            let html = MarkdownParser.parse(markdown);
            
            // Fix relative paths
            html = MarkdownParser.fixRelativeImagePaths(html, path);
            html = MarkdownParser.fixRelativeLinks(html, path);
            
            // Update content area
            contentArea.innerHTML = `<div class="lab-content">${html}</div>`;
            
            // Initialize syntax highlighting for code blocks
            if (window.hljs) {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            }
            
            // If on mobile, close the sidebar after selecting content
            if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error loading content:', error);
            contentArea.innerHTML = `<div class="error"><p>Error loading content: ${error.message}</p><p>Try refreshing the page or selecting a different lab.</p></div>`;
        }
    }

    // Handle search
    function handleSearch() {
        const query = searchInput.value.toLowerCase();
        const allLabItems = document.querySelectorAll('.lab-item');
        const allCategories = document.querySelectorAll('.category');
        
        if (query === '') {
            // Reset view when search is cleared
            allLabItems.forEach(item => item.style.display = '');
            allCategories.forEach(category => category.style.display = '');
            return;
        }
        
        allCategories.forEach(category => {
            let hasMatch = false;
            
            // Check all lab items in this category
            const labItems = category.querySelectorAll('.lab-item');
            labItems.forEach(item => {
                if (item.textContent.toLowerCase().includes(query)) {
                    item.style.display = '';
                    hasMatch = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide category based on matches
            category.style.display = hasMatch ? '' : 'none';
            
            // Expand categories with matches
            if (hasMatch && !category.classList.contains('active')) {
                category.classList.add('active');
                const icon = category.querySelector('.category-header i:last-child');
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        sidebar.classList.toggle('active');
    }

    // Initialize the portal
    function initPortal() {
        buildSidebar();
        
        // Add event listeners
        searchInput.addEventListener('input', handleSearch);
        menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                sidebar.classList.remove('active');
            }
        });
        
        // Add click listener for outside sidebar (to close on mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 992 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(event.target) && 
                event.target !== menuToggle) {
                sidebar.classList.remove('active');
            }
        });

        // Open the first category by default
        const firstCategory = document.querySelector('.category');
        if (firstCategory) {
            toggleCategory(firstCategory);
        }
    }

    // Start the portal
    initPortal();
});
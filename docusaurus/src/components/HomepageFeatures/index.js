import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Comprehensive Kubernetes Labs',
    Svg: require('@site/static/img/kubernetes-icon.svg').default,
    description: (
      <>
        KubeLabs offers hands-on labs and tutorials covering all aspects of Kubernetes, 
        from beginner basics to advanced concepts.
      </>
    ),
  },
  {
    title: 'Cloud Provider Integrations',
    Svg: require('@site/static/img/cloud-icon.svg').default,
    description: (
      <>
        Learn how to deploy and manage Kubernetes across major cloud providers 
        including AWS (EKS), Azure (AKS), Google Cloud (GKE), and more.
      </>
    ),
  },
  {
    title: 'Community-Driven',
    Svg: require('@site/static/img/community-icon.svg').default,
    description: (
      <>
        Join our growing community of Kubernetes enthusiasts. 
        All labs are open-source and regularly updated with the latest Kubernetes best practices.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
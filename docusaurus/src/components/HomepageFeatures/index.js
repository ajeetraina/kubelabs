import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Hands-on Learning',
    description: (
      <>
        Learn Kubernetes by doing. Our labs provide practical
        experience with real-world scenarios.
      </>
    ),
  },
  {
    title: 'From Basics to Advanced',
    description: (
      <>
        Start with simple pods and work your way up to complex
        architectures with networking, storage, and security.
      </>
    ),
  },
  {
    title: 'Community Driven',
    description: (
      <>
        Join thousands of DevOps engineers in our community
        on Slack and Discord to share knowledge and get help.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
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
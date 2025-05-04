import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            Get Started with Kubernetes Labs
          </Link>
        </div>
      </div>
    </header>
  );
}

function LabCategories() {
  return (
    <section className={styles.labCategories}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Explore Lab Categories</h2>
        <div className="row">
          <div className="col col--4">
            <div className={styles.categoryCard}>
              <h3>Core Kubernetes</h3>
              <p>Master the fundamentals with hands-on labs covering Pods, ReplicaSets, Deployments, Services, and more.</p>
              <div className={styles.cardLinks}>
                <Link to="/category/core-kubernetes-concepts">Start Learning →</Link>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.categoryCard}>
              <h3>Cloud Providers</h3>
              <p>Deploy Kubernetes across major cloud platforms including AWS EKS, Azure AKS, Google GKE, and Linode LKE.</p>
              <div className={styles.cardLinks}>
                <Link to="/category/cloud-providers">Explore Clouds →</Link>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.categoryCard}>
              <h3>Advanced Topics</h3>
              <p>Take your skills to the next level with GitOps, Monitoring, Security, Service Mesh, and more.</p>
              <div className={styles.cardLinks}>
                <Link to="/category/advanced-topics">Advanced Labs →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Join Our Kubernetes Community</h2>
        <div className="row">
          <div className="col col--6">
            <div className={styles.communityContent}>
              <h3>Learn and Contribute</h3>
              <p>KubeLabs is an open-source project powered by a community of Kubernetes enthusiasts. Join us to learn, share, and contribute to the growing ecosystem of Kubernetes learning resources.</p>
              <div className={styles.communityButtons}>
                <Link className="button button--primary" to="https://github.com/ajeetraina/kubelabs">
                  GitHub Repository
                </Link>
                <Link className="button button--outline button--primary" to="https://launchpass.com/collabnix">
                  Join Slack
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.statsList}>
              <div className={styles.statItem}>
                <h3>500+</h3>
                <p>Interactive Labs</p>
              </div>
              <div className={styles.statItem}>
                <h3>9,000+</h3>
                <p>Community Members</p>
              </div>
              <div className={styles.statItem}>
                <h3>$0</h3>
                <p>Cost to Learn</p>
              </div>
              <div className={styles.statItem}>
                <h3>24/7</h3>
                <p>Community Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Hands-on Kubernetes Labs`}
      description="A curated list of Kubernetes hands-on labs and tutorials for all skill levels">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LabCategories />
        <CommunitySection />
      </main>
    </Layout>
  );
}

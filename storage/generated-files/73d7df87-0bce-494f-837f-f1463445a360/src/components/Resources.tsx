import React from 'react';
function Resources() {
  return (
    <section className="resources">
      <h2>Resources & Education</h2>
      <div className="resource-cards">
        <div className="resource-card">
          <h3>Financial Tips</h3>
          <p>Read our blog for financial advice.</p>
          <a href="/blog">Read Blog</a>
        </div>
        <div className="resource-card">
          <h3>Educational Videos</h3>
          <p>Watch videos to learn more.</p>
          <a href="/videos">Watch Videos</a>
        </div>
        <div className="resource-card">
          <h3>FAQ</h3>
          <p>Find answers to common questions.</p>
          <a href="/faq">Go to FAQ</a>
        </div>
      </div>
    </section>
  );
}

export default Resources;
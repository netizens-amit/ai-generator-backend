import React from 'react';
function ProductComparison() {
  return (
    <section className="product-comparison">
      <h2>Product Comparison</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Basic</th>
            <th>Premium</th>
            <th>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interest Rate</td>
            <td>1.5%</td>
            <td>2%</td>
            <td>2.5%</td>
          </tr>
          <tr>
            <td>Annual Fee</td>
            <td>$0</td>
            <td>$10</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>Customer Support</td>
            <td>Email</td>
            <td>Phone</td>
            <td>24/7 Chat</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default ProductComparison;
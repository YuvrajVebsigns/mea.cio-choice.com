export const metadata = {
  title: 'Process and Flow',
  description:
    'CIO CHOICE has a 3 stage easy and simple process for product, solution, and service recognition.',
};

export default function ProcessPage() {
  return (
    <main className="process-page">
      <section className="process-container">
        <div className="process-hero">
          <p className="process-label">Process & Flow</p>

          <h1>CIO CHOICE has a 3 stage easy and simple process</h1>

          <p>
            The CIO CHOICE recognition process is designed to ensure fairness, transparency and
            credibility through application validation, advisory panel review and independent CIO
            nomination surveys.
          </p>
        </div>

        {/* Stage 1 */}

        <details open className="process-card">
          <summary>Stage 1: Call for Applications</summary>

          <div>
            <ol>
              <li>
                The advisory panel comprises industry leaders and CIOs from various fields,
                including manufacturing, banking, pharma, travel & logistics and marketing.
              </li>

              <li>
                All products, solutions and/or services entries received are filtered by the
                advisory panel for validation and the names are drawn up in each category.
              </li>

              <li>
                All applications are collated and segregated by the CIO CHOICE secretariat team as
                per their relevant categories.
              </li>

              <li>
                ICT Companies apply for the CIO CHOICE recognition title based on the categories of
                their offering – product, solution and/or services.
              </li>

              <li>
                ICT Companies keen to participate are invited to fill in the application so that the
                secretariat team can work with them for validation and reference checks if
                necessary.
              </li>

              <li>
                Entry is open to all ICT products, services and/or solutions launched and available
                in the Middle East & Africa over the past 12 months. The application fee to enter
                the process is USD 1000/- per product, solution and/or service. Products entered
                into the process cannot be withdrawn at any stage once submitted.
              </li>

              <li>
                Substantial media investment ensures visible coverage and awareness for receiving
                the honor title through the CIO CHOICE website.
              </li>

              <li>
                After validation by the expert panel, eligible products, solutions and/or services
                move to the next stage of the CIO survey process.
              </li>

              <li>
                CIOs determine and choose the products that will receive the CIO CHOICE recognition.
              </li>

              <li>
                An independent survey is conducted through online responses from the CIO community.
              </li>

              <li>
                Responses are collated through survey questionnaires asking CIOs for their inputs on
                products, solutions and/or services across the approved categories.
              </li>

              <li>
                CIO responses determine which products, solutions and/or services receive the CIO
                CHOICE recognition title.
              </li>
            </ol>
          </div>
        </details>

        {/* Stage 2 */}

        <details className="process-card">
          <summary>Stage 2: CIO CHOICE Advisory Panel</summary>

          <div>
            <ol>
              <li>
                All products, solutions and/or services received are filtered and validated before
                category shortlisting.
              </li>

              <li>
                The advisory panel comprises industry leaders and CIOs from manufacturing, banking,
                pharma, travel & logistics, marketing and other sectors.
              </li>

              <li>
                Eligible products, solutions and/or services move to the final CIO nomination survey
                stage.
              </li>
            </ol>
          </div>
        </details>

        {/* Stage 3 */}

        <details className="process-card">
          <summary>
            Stage 3: CIOs via a Nomination Survey decide their preferred Products, Solutions and/or
            Services
          </summary>

          <div>
            <ol>
              <li>
                CIOs determine and choose the products that will be honored by the CIO CHOICE
                recognition.
              </li>

              <li>
                An Independent Nomination Survey is conducted through online responses from the CIO
                community.
              </li>

              <li>
                Responses from CIOs are collected through the nomination survey, asking for their
                preferred products, solutions and/or services by category.
              </li>

              <li>
                The CIO responses determine which products, solutions and/or services are bestowed
                with the CIO CHOICE recognition title.
              </li>
            </ol>
          </div>
        </details>

        {/* Recognition */}

        <details className="process-card">
          <summary>The Recognition</summary>

          <div>
            <p>
              The CIO CHOICE recognition is presented during a grand gala evening attended by a
              large gathering of CXO guests from the ICT industry to celebrate the ICT companies
              honored with the CIO CHOICE recognition title across each category.
            </p>
          </div>
        </details>

        {/* Promotion */}

        <details className="process-card">
          <summary>Honored Products Promote the Recognition</summary>

          <div>
            <p>
              Following the official announcement, honored ICT companies may use the{' '}
              <strong>CIO CHOICE</strong> title logo for one calendar year across their product
              packaging, promotions, advertising and marketing campaigns.
            </p>

            <p>
              For the first time, CIOs gain the confidence of recommendations made by fellow CIOs,
              helping them select the best ICT products, solutions and services. The recognized
              products and services benefit from increased awareness, stronger market visibility and
              the potential for higher sales.
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}

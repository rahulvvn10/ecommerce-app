import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <>
      <style>
        {`
        .checkout-progress {
          gap: 0;
          font-family: Arial, sans-serif;
        }

        .checkout-progress a {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .step {
          padding: 12px 20px;
          font-weight: 600;
          font-size: 14px;
          text-align: center;
          background: #e0e0e0;
          color: #555;
          position: relative;
        }

        .active-step {
          background: #28a745;
          color: #fff;
        }

        .incomplete {
          background: #e0e0e0;
          color: #888;
        }

        /* LEFT TRIANGLE */
        .triangle2-active {
          width: 0;
          height: 0;
          border-top: 24px solid transparent;
          border-bottom: 24px solid transparent;
          border-right: 15px solid #28a745;
        }

        .triangle2-incomplete {
          width: 0;
          height: 0;
          border-top: 24px solid transparent;
          border-bottom: 24px solid transparent;
          border-right: 15px solid #e0e0e0;
        }

        /* RIGHT TRIANGLE */
        .triangle-active {
          width: 0;
          height: 0;
          border-top: 24px solid transparent;
          border-bottom: 24px solid transparent;
          border-left: 15px solid #28a745;
        }

        .triangle-incomplete {
          width: 0;
          height: 0;
          border-top: 24px solid transparent;
          border-bottom: 24px solid transparent;
          border-left: 15px solid #e0e0e0;
        }

        /* Hover effect */
        .checkout-progress a:hover .step {
          filter: brightness(0.95);
        }
          .active-step {
  background: linear-gradient(90deg, #6366f1, #a855f7);
  color: #fff;
}

/* LEFT TRIANGLE - ACTIVE */
.triangle2-active {
  width: 0;
  height: 0;
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  border-right: 15px solid #6366f1; /* gradient start color */
}

/* RIGHT TRIANGLE - ACTIVE */
.triangle-active {
  width: 0;
  height: 0;
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  border-left: 15px solid #a855f7; /* gradient end color */
}
        `}
      </style>

      <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? (
          <Link to="/shipping">
            <div className="triangle2-active"></div>
            <div className="step active-step">Shipping Info</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="/shipping">
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Shipping Info</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/order/confirm">
            <div className="triangle2-active"></div>
            <div className="step active-step">Confirm Order</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="/order/confirm">
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {payment ? (
          <Link to="/payment">
            <div className="triangle2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="/payment">
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </>
  );
}

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();

  const { userOrders=[], loading, error } = useSelector(
    state => state.orderState
  );

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  return (
    <Fragment>
      <h1 className="mt-5">My Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && userOrders.length === 0 && (
        <p>You have not placed any orders yet.</p>
      )}

      {!loading && userOrders.length > 0 && (
        <table className="table table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {userOrders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>{order.orderItems.length}</td>

                <td>₹{order.totalPrice}</td>

                <td>
                  <span
                    style={{
                      color: order.orderStatus === "Delivered"
                        ? "green"
                        : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/order/${order._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
}

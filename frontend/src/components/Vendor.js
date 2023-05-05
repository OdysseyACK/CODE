import { Link } from "react-router-dom";

export default function Vendor(props) {
  const { user } = props;

  return (
    <div>
      <div key={user._id}>
        <Link to={`/login?redirect=/profilepage/${user._id}`}>
          <img
            style={{
              maxHeight: "220px",
              maxWidth: "220px",
              minWidth: "220px",
              minHeight: "220px",
            }}
            src={user.profilePic}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}

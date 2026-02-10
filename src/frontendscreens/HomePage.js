import "./styles.css";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoMenuOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

export default function App() {
  return (
    <div className="App">
      <div style={{ flexDirection: "row", display: "flex", gap: "400px" }}>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            gap: "10px",
            marginLeft: "20px",
          }}
        >
          <IoArrowBackOutline style={{ fontSize: "25px" }}></IoArrowBackOutline>

          <IoMenuOutline style={{ fontSize: "35px" }}></IoMenuOutline>
        </div>
        <h1 style={{ color: "#29AC3D" }}>DormDash</h1>
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "35px",
            borderRadius: "20px",
            backgroundColor: "#29AC3D",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h1 style={{ fontSize: "14px", color: "white", textAlign: "center" }}>
            View all Jobs
          </h1>
        </div>

        <div
          style={{
            width: "200px",
            height: "35px",
            borderRadius: "20px",
            backgroundColor: "#29AC3D",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "14px", color: "white", textAlign: "center" }}>
            Post a Job
          </h1>
        </div>

        <div
          style={{
            width: "200px",
            height: "35px",
            borderRadius: "20px",
            backgroundColor: "#29AC3D",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "14px", color: "white", textAlign: "center" }}>
            My requests
          </h1>
        </div>
      </div>

      <div style={{ flexDirection: "row", display: "flex", gap: "110px" }}>
        <div style={{ flexDirection: "column" }}>
          <h2
            style={{
              textAlign: "left",
              marginLeft: "30px",
              marginTop: "40px",
              marginBottom: "30px",
            }}
          >
            Available Jobs
          </h2>

          <div style={{ flexDirection: "column", marginLeft: "50px" }}>
            <div
              style={{
                width: "350px",
                height: "120px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                justifyContent: "center",
                marginBottom: "30px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{ flexDirection: "row", display: "flex", gap: "130px" }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "black",
                    textAlign: "left",
                    marginLeft: "15px",
                    fontWeight: "normal",
                    marginTop: "15px",
                  }}
                >
                  Pick up food from Commons
                </h1>
                <h1 style={{ fontSize: "12px", color: "#29AC3D" }}>$5</h1>
              </div>

              <h1
                style={{
                  fontSize: "12px",
                  color: "gray",
                  textAlign: "left",
                  marginLeft: "15px",
                  fontWeight: "normal",
                }}
              >
                Need someone to grab my lunch from the dining hall
              </h1>

              <div style={{ flexDirection: "row", display: "flex" }}>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <IoLocationOutline
                    style={{
                      color: "gray",
                      fontSize: "20px",
                      marginLeft: "14px",
                    }}
                  >
                    {" "}
                  </IoLocationOutline>

                  <h1
                    style={{
                      fontSize: "11px",
                      textAlign: "left",
                      marginLeft: "10px",
                      color: "gray",
                      fontWeight: "normal",
                    }}
                  >
                    North Campus
                  </h1>
                </div>

                <IoTimeOutline
                  style={{
                    color: "gray",
                    fontSize: "20px",
                    marginLeft: "14px",
                  }}
                ></IoTimeOutline>
                <h1
                  style={{
                    fontSize: "11px",
                    textAlign: "left",
                    marginLeft: "10px",
                    color: "gray",
                    fontWeight: "normal",
                  }}
                >
                  12:30 PM
                </h1>
              </div>
            </div>
            <div
              style={{
                width: "350px",
                height: "120px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{ flexDirection: "row", display: "flex", gap: "180px" }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "black",
                    textAlign: "left",
                    marginLeft: "15px",
                    fontWeight: "normal",
                    marginTop: "15px",
                  }}
                >
                  Library book return
                </h1>
                <h1
                  style={{
                    color: "#29AC3D",
                    fontSize: "12px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  $10
                </h1>
              </div>
              <h1
                style={{
                  fontSize: "12px",
                  color: "gray",
                  textAlign: "left",
                  marginLeft: "15px",
                  fontWeight: "normal",
                }}
              >
                return three books to the main library
              </h1>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <IoLocationOutline
                  style={{
                    color: "gray",
                    fontSize: "20px",
                    marginLeft: "14px",
                  }}
                >
                  {" "}
                </IoLocationOutline>
                <h1
                  style={{
                    fontSize: "11px",
                    textAlign: "left",
                    marginLeft: "15px",
                    color: "gray",
                    fontWeight: "normal",
                  }}
                >
                  North Campus
                </h1>

                <IoTimeOutline
                  style={{
                    color: "gray",
                    fontSize: "20px",
                    marginLeft: "14px",
                  }}
                >
                  {" "}
                </IoTimeOutline>
                <h1
                  style={{
                    fontSize: "11px",
                    textAlign: "left",
                    marginLeft: "15px",
                    color: "gray",
                    fontWeight: "normal",
                  }}
                >
                  12:30 PM
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flexDirection: "column", display: "flex" }}>
          <h2
            style={{
              textAlign: "left",
              marginTop: "40px",
              marginBottom: "30px",
            }}
          >
            Recent Activities
          </h2>
          <div style={{ flexDirection: "row", display: "flex", gap: "40px" }}>
            <div
              style={{
                width: "200px",
                height: "120px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <IoCheckmarkCircleOutline
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#29AC3D",
                }}
              ></IoCheckmarkCircleOutline>
              <h1
                style={{
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Coffee Delivery
              </h1>

              <h1
                style={{
                  fontSize: "12px",
                  color: "#29AC3D",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Completed
              </h1>

              <h1
                style={{
                  fontSize: "10px",
                  color: "gray",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                3 hours ago
              </h1>
            </div>

            <div
              style={{
                width: "200px",
                height: "120px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <IoCheckmarkCircleOutline
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#29AC3D",
                }}
              ></IoCheckmarkCircleOutline>
              <h1
                style={{
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "normal",
                  textAlign: "center",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              >
                package pickup from mailroom
              </h1>

              <h1
                style={{
                  fontSize: "12px",
                  color: "#29AC3D",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Completed
              </h1>

              <h1
                style={{
                  fontSize: "10px",
                  color: "gray",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Yesterday
              </h1>
            </div>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              gap: "40px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "120px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <IoCheckmarkCircleOutline
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#29AC3D",
                }}
              ></IoCheckmarkCircleOutline>
              <h1
                style={{
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Tutoring Help
              </h1>

              <h1
                style={{
                  fontSize: "12px",
                  color: "#29AC3D",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Completed
              </h1>

              <h1
                style={{
                  fontSize: "10px",
                  color: "gray",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Yesterday
              </h1>
            </div>

            <div
              style={{
                width: "200px",
                height: "120px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <IoCheckmarkCircleOutline
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#29AC3D",
                }}
              ></IoCheckmarkCircleOutline>
              <h1
                style={{
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Coffee Delivery
              </h1>

              <h1
                style={{
                  fontSize: "12px",
                  color: "#29AC3D",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                Completed
              </h1>

              <h1
                style={{
                  fontSize: "10px",
                  color: "gray",
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                3 days ago
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

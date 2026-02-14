import React from "react";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoMenuOutline,
  IoArrowBackOutline,
  IoCalendarOutline,
  IoLogoUsd,
} from "react-icons/io5";

export default function JobBoard() {
  return (
    <>
      <IoMenuOutline style={{ fontSize: 35, marginBottom: 1 }}></IoMenuOutline>
      <h1
        style={{
          textAlign: "center",
          color: "#29AC3D",
          fontFamily: "Inter",
          fontWeight: "bold",
          marginBottom: "30px",
          marginTop: 2,
        }}
      >
        My Requests
      </h1>

      <hr
        style={{
          border: "none",
          marginBottom: "30px",
          height: "1px",
          backgroundColor: "#ccc",
          width: "100vw", // Ensures it spans the full viewport width
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)", // Centers it if inside a container
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)", // Horizontal, Vertical, Blur, Color
        }}
      />

      <div style={{ justifySelf: "center" }}>
        <button
          style={{
            width: 150,
            height: 70,
            backgroundColor: "transparent",
            borderWidth: "1.5px",
            borderRadius: "5px",
            borderStyle: "solid",
            borderColor: "#d1d5dc",
          }}
        >
          {" "}
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: 2,
              marginBottom: 1,
              color: "#29AC3D",
            }}
          >
            2
          </h1>
          <h1
            style={{ fontSize: "9px", fontWeight: "normal", color: "#6a7282" }}
          >
            Active Requests
          </h1>
        </button>

        <button
          style={{
            width: 150,
            height: 70,
            backgroundColor: "transparent",
            borderWidth: "1.5px",
            borderRadius: "5px",
            borderStyle: "solid",
            borderColor: "#d1d5dc",
            marginLeft: 15,
          }}
        >
          {" "}
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: 2,
              marginBottom: 1,
              color: "#d97706",
            }}
          >
            1
          </h1>
          <h1
            style={{ fontSize: "9px", fontWeight: "normal", color: "#6a7282" }}
          >
            In Progress
          </h1>
        </button>

        <button
          style={{
            width: 150,
            height: 70,
            backgroundColor: "transparent",
            borderWidth: "1.5px",
            borderRadius: "5px",
            borderStyle: "solid",
            borderColor: "#d1d5dc",
            marginLeft: 15,
          }}
        >
          {" "}
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: 2,
              marginBottom: 1,
              color: "#6b7280",
            }}
          >
            1
          </h1>
          <h1
            style={{ fontSize: "9px", fontWeight: "normal", color: "#6a7282" }}
          >
            Completed
          </h1>
        </button>
      </div>

      <div
        style={{
          flexDirection: "column",

          justifySelf: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            width: "500px",
            height: "250px",
            borderRadius: "10px",
            backgroundColor: "transparent",
            borderColor: "#d1d5dc",
            borderWidth: "1.9px",
            justifyContent: "center",
            marginBottom: "30px",
            borderStyle: "solid",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex", gap: 300 }}>
            <div
              style={{
                width: 80,
                height: 40,
                backgroundColor: "transparent",
                borderWidth: "1.5px",
                borderRadius: "5px",
                borderStyle: "solid",
                borderColor: "#16a34a",
                marginTop: "10px",
                marginLeft: 10,
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "normal",
                  marginTop: 2,
                  marginBottom: 1,
                  marginLeft: 1,
                }}
              >
                🚘
              </h1>
              <h1
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  marginLeft: 5,
                }}
              >
                Ride
              </h1>
            </div>

            <div
              style={{
                width: 90,
                height: 35,
                backgroundColor: "#e6f9f0",
                borderRadius: 9,
                justifyContent: "center",
                justifyItem: "center",
                display: "flex",
                marginTop: 10,
              }}
            >
              <h1
                style={{
                  fontSize: 13,
                  fontFamily: "Inter",
                  textAlign: "center",
                  color: "#29ac3d",
                  fontWeight: "normal",
                  display: "flex",
                }}
              >
                Active
              </h1>
            </div>
          </div>
          <div style={{ marginLeft: 10 }}>
            <h1
              style={{
                fontSize: "15px",
                fontFamily: "Inter",
              }}
            >
              Ride to Airport
            </h1>
            <h1
              style={{
                fontSize: "13px",
                color: "#6a7282",
                fontFamily: "Inter",
                fontWeight: "normal",
              }}
            >
              I need a ride to the airport for spring break
            </h1>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                gap: 20,
                marginTop: 15,
              }}
            >
              <div style={{ flexDirection: "row", display: "flex", gap: 10 }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: 100,
                    backgroundColor: "#f0fdf4",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {" "}
                  <IoTimeOutline
                    style={{
                      color: "#29ac3d",
                      justifySelf: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  ></IoTimeOutline>
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    marginTop: 1,
                  }}
                >
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginBottom: "1px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      marginTop: 0,
                    }}
                  >
                    Date & Time
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      marginTop: 0,
                      marginBottom: 1,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    Sat, Feb 14, 2026
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginTop: 0,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    14:30
                  </h1>
                </div>
              </div>

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLocationOutline
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLocationOutline>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Location
                </h1>
                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "normal",
                  }}
                >
                  Hadley Village --> Airport
                </h1>
              </div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLogoUsd
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLogoUsd>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Budget
                </h1>

                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#29ac3d",
                  }}
                >
                  $25
                </h1>
              </div>
            </div>
            <div
              style={{
                width: "470px",
                borderColor: "#d1d5dc",
                borderStyle: "solid",
                borderWidth: 1,
                marginTop: 15,
              }}
            ></div>

            <div
              style={{
                width: 120,
                height: 35,
                backgroundColor: "#29ac3d",
                borderRadius: 10,
                justifyContent: "center",
                display: "flex",
                marginTop: 10,
                marginLeft: 350,
              }}
            >
              <h1
                style={{
                  fontSize: "13px",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  fontFamily: "Inter",
                  fontWeight: "normal",
                }}
              >
                View Details
              </h1>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "500px",
            height: "250px",
            borderRadius: "10px",
            backgroundColor: "transparent",
            borderColor: "#d1d5dc",
            borderWidth: "1.9px",
            justifyContent: "center",
            marginBottom: "30px",
            borderStyle: "solid",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex", gap: 300 }}>
            <div
              style={{
                width: 90,
                height: 40,
                backgroundColor: "transparent",
                borderWidth: "1.5px",
                borderRadius: "5px",
                borderStyle: "solid",
                borderColor: "#16a34a",
                marginTop: "10px",
                marginLeft: 10,
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "normal",
                  marginTop: 2,
                  marginBottom: 1,
                  marginLeft: 1,
                }}
              >
                🧼
              </h1>
              <h1
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  marginLeft: 5,
                }}
              >
                Cleaning
              </h1>
            </div>

            <div
              style={{
                width: 90,
                height: 35,
                backgroundColor: "#e6f9f0",
                borderRadius: 9,
                justifyContent: "center",
                justifyItem: "center",
                display: "flex",
                marginTop: 10,
              }}
            >
              <h1
                style={{
                  fontSize: 13,
                  fontFamily: "Inter",
                  textAlign: "center",
                  color: "#29ac3d",
                  fontWeight: "normal",
                  display: "flex",
                }}
              >
                Active
              </h1>
            </div>
          </div>
          <div style={{ marginLeft: 10 }}>
            <h1
              style={{
                fontSize: "15px",
                fontFamily: "Inter",
              }}
            >
              Bathroom Cleaning
            </h1>
            <h1
              style={{
                fontSize: "13px",
                color: "#6a7282",
                fontFamily: "Inter",
                fontWeight: "normal",
              }}
            >
              Need somone to deep clean a shared bathroom
            </h1>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                gap: 20,
                marginTop: 15,
              }}
            >
              <div style={{ flexDirection: "row", display: "flex", gap: 10 }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: 100,
                    backgroundColor: "#f0fdf4",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {" "}
                  <IoTimeOutline
                    style={{
                      color: "#29ac3d",
                      justifySelf: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  ></IoTimeOutline>
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    marginTop: 1,
                  }}
                >
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginBottom: "1px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      marginTop: 0,
                    }}
                  >
                    Date & Time
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      marginTop: 0,
                      marginBottom: 1,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    Sat, Feb 14, 2026
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginTop: 0,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    14:30
                  </h1>
                </div>
              </div>

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLocationOutline
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLocationOutline>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Location
                </h1>
                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "normal",
                  }}
                >
                  Ellicot Complex
                </h1>
              </div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLogoUsd
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLogoUsd>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Budget
                </h1>

                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#29ac3d",
                  }}
                >
                  $25
                </h1>
              </div>
            </div>
            <div
              style={{
                width: "470px",
                borderColor: "#d1d5dc",
                borderStyle: "solid",
                borderWidth: 1,
                marginTop: 15,
              }}
            ></div>

            <div
              style={{
                width: 120,
                height: 35,
                backgroundColor: "#29ac3d",
                borderRadius: 10,
                justifyContent: "center",
                display: "flex",
                marginTop: 10,
                marginLeft: 350,
              }}
            >
              <h1
                style={{
                  fontSize: "13px",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  fontFamily: "Inter",
                  fontWeight: "normal",
                }}
              >
                View Details
              </h1>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "500px",
            height: "250px",
            borderRadius: "10px",
            backgroundColor: "transparent",
            borderColor: "#d1d5dc",
            borderWidth: "1.9px",
            justifyContent: "center",
            marginBottom: "30px",
            borderStyle: "solid",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex", gap: 300 }}>
            <div
              style={{
                width: 80,
                height: 40,
                backgroundColor: "transparent",
                borderWidth: "1.5px",
                borderRadius: "5px",
                borderStyle: "solid",
                borderColor: "#16a34a",
                marginTop: "10px",
                marginLeft: 10,
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "normal",
                  marginTop: 2,
                  marginBottom: 1,
                  marginLeft: 1,
                }}
              >
                🍔
              </h1>
              <h1
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  marginLeft: 5,
                }}
              >
                Food
              </h1>
            </div>

            <div
              style={{
                width: 90,
                height: 35,
                backgroundColor: "#e6f9f0",
                borderRadius: 9,
                justifyContent: "center",
                justifyItem: "center",
                display: "flex",
                marginTop: 10,
              }}
            >
              <h1
                style={{
                  fontSize: 13,
                  fontFamily: "Inter",
                  textAlign: "center",
                  color: "#29ac3d",
                  fontWeight: "normal",
                  display: "flex",
                }}
              >
                Active
              </h1>
            </div>
          </div>
          <div style={{ marginLeft: 10 }}>
            <h1
              style={{
                fontSize: "15px",
                fontFamily: "Inter",
              }}
            >
              Lunch Pickup
            </h1>
            <h1
              style={{
                fontSize: "13px",
                color: "#6a7282",
                fontFamily: "Inter",
                fontWeight: "normal",
              }}
            >
              I need someone to pickup my lunch from the commons at Dancing Chop
              Sticks
            </h1>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                gap: 20,
                marginTop: 15,
              }}
            >
              <div style={{ flexDirection: "row", display: "flex", gap: 10 }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: 100,
                    backgroundColor: "#f0fdf4",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {" "}
                  <IoTimeOutline
                    style={{
                      color: "#29ac3d",
                      justifySelf: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  ></IoTimeOutline>
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    marginTop: 1,
                  }}
                >
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginBottom: "1px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      marginTop: 0,
                    }}
                  >
                    Date & Time
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      marginTop: 0,
                      marginBottom: 1,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    Sat, Feb 14, 2026
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginTop: 0,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    14:30
                  </h1>
                </div>
              </div>

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLocationOutline
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLocationOutline>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Location
                </h1>
                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "normal",
                  }}
                >
                  UB Commons --> Flint Village
                </h1>
              </div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLogoUsd
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLogoUsd>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Budget
                </h1>

                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#29ac3d",
                  }}
                >
                  $25
                </h1>
              </div>
            </div>
            <div
              style={{
                width: "470px",
                borderColor: "#d1d5dc",
                borderStyle: "solid",
                borderWidth: 1,
                marginTop: 15,
              }}
            ></div>

            <div
              style={{
                width: 120,
                height: 35,
                backgroundColor: "#29ac3d",
                borderRadius: 10,
                justifyContent: "center",
                display: "flex",
                marginTop: 10,
                marginLeft: 350,
              }}
            >
              <h1
                style={{
                  fontSize: "13px",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  fontFamily: "Inter",
                  fontWeight: "normal",
                }}
              >
                View Details
              </h1>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "500px",
            height: "250px",
            borderRadius: "10px",
            backgroundColor: "transparent",
            borderColor: "#d1d5dc",
            borderWidth: "1.9px",
            justifyContent: "center",
            marginBottom: "30px",
            borderStyle: "solid",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex", gap: 300 }}>
            <div
              style={{
                width: 90,
                height: 40,
                backgroundColor: "transparent",
                borderWidth: "1.5px",
                borderRadius: "5px",
                borderStyle: "solid",
                borderColor: "#16a34a",
                marginTop: "10px",
                marginLeft: 10,
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "normal",
                  marginTop: 2,
                  marginBottom: 1,
                  marginLeft: 1,
                }}
              >
                📚
              </h1>
              <h1
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  marginLeft: 5,
                }}
              >
                Tutoring
              </h1>
            </div>

            <div
              style={{
                width: 90,
                height: 35,
                backgroundColor: "#e6f9f0",
                borderRadius: 9,
                justifyContent: "center",
                justifyItem: "center",
                display: "flex",
                marginTop: 10,
              }}
            >
              <h1
                style={{
                  fontSize: 13,
                  fontFamily: "Inter",
                  textAlign: "center",
                  color: "#29ac3d",
                  fontWeight: "normal",
                  display: "flex",
                }}
              >
                Active
              </h1>
            </div>
          </div>
          <div style={{ marginLeft: 10 }}>
            <h1
              style={{
                fontSize: "15px",
                fontFamily: "Inter",
              }}
            >
              Math Tutoring
            </h1>
            <h1
              style={{
                fontSize: "13px",
                color: "#6a7282",
                fontFamily: "Inter",
                fontWeight: "normal",
              }}
            >
              Need help with calculus 2 homework
            </h1>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                gap: 20,
                marginTop: 15,
              }}
            >
              <div style={{ flexDirection: "row", display: "flex", gap: 10 }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: 100,
                    backgroundColor: "#f0fdf4",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {" "}
                  <IoTimeOutline
                    style={{
                      color: "#29ac3d",
                      justifySelf: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  ></IoTimeOutline>
                </div>

                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    marginTop: 1,
                  }}
                >
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginBottom: "1px",
                      fontFamily: "Inter",
                      fontWeight: "normal",
                      marginTop: 0,
                    }}
                  >
                    Date & Time
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      marginTop: 0,
                      marginBottom: 1,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    Sat, Feb 15, 2026
                  </h1>
                  <h1
                    style={{
                      fontSize: "12px",
                      color: "#6a7282",
                      marginTop: 0,
                      fontFamily: "Inter",
                      fontWeight: "normal",
                    }}
                  >
                    16:00
                  </h1>
                </div>
              </div>

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLocationOutline
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLocationOutline>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Location
                </h1>
                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "normal",
                  }}
                >
                  Library Study Room 3
                </h1>
              </div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  backgroundColor: "#f0fdf4",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <IoLogoUsd
                  style={{
                    color: "#29ac3d",
                    justifySelf: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                ></IoLogoUsd>
              </div>

              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  marginTop: 1,
                }}
              >
                <h1
                  style={{
                    fontSize: "12px",
                    color: "#6a7282",
                    marginBottom: "1px",
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    marginTop: 0,
                  }}
                >
                  Budget
                </h1>

                <h1
                  style={{
                    fontSize: "12px",
                    marginTop: 0,
                    marginBottom: 1,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#29ac3d",
                  }}
                >
                  $30
                </h1>
              </div>
            </div>
            <div
              style={{
                width: "470px",
                borderColor: "#d1d5dc",
                borderStyle: "solid",
                borderWidth: 1,
                marginTop: 15,
              }}
            ></div>

            <div
              style={{
                width: 120,
                height: 35,
                backgroundColor: "#29ac3d",
                borderRadius: 10,
                justifyContent: "center",
                display: "flex",
                marginTop: 10,
                marginLeft: 350,
              }}
            >
              <h1
                style={{
                  fontSize: "13px",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  fontFamily: "Inter",
                  fontWeight: "normal",
                }}
              >
                View Details
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
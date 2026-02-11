import React from "react";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoMenuOutline,
  IoArrowBackOutline,
  IoCalendarOutline,
} from "react-icons/io5";

export default function JobBoard() {
  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #d1d5dc;
            text-align: left;
            text-indent: 50px ;
            opacity: 1;
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            font-weight: 'normal';
          }
        `}
      </style>

      <IoMenuOutline style={{ fontSize: 35, marginBottom: 1 }}></IoMenuOutline>

      <h1
        style={{
          textAlign: "center",
          color: "#29AC3D",
          fontFamily: "Inter",
          fontWeight: "bold",
          marginBottom: "2px",
          marginTop: 2,
        }}
      >
        Post A Job
      </h1>
      <h1
        style={{
          textAlign: "center",
          color: "#6a7282",
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: "normal",
          marginBottom: "30px",
        }}
      >
        Fill in the details below to post your job
      </h1>

      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#ccc",
          width: "100vw", // Ensures it spans the full viewport width
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)", // Centers it if inside a container
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)", // Horizontal, Vertical, Blur, Color
        }}
      />

      <div style={{ marginLeft: 15 }}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: "5px",
            marginBottom: 10,
          }}
        >
          <h1
            style={{
              textAlign: "left",
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: "normal",
            }}
          >
            Service type
          </h1>
          <h1
            style={{
              textAlign: "center",
              color: "#86a94e",
              fontSize: "9px",
              fontWeight: "normal",
              fontFamily: "Inter",
            }}
          >
            (choose the best category to define the job you want done)
          </h1>
        </div>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 15,
            marginLeft: 80,
          }}
        >
          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              🚘
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Rides</h1>
          </button>
          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              🛒
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Groceries</h1>
          </button>
          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              🧼
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Cleaning</h1>
          </button>

          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              📚
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Tutoring</h1>
          </button>
          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              👨‍🔧
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Handyman</h1>
          </button>
          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              👨‍🍳
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Cooking</h1>
          </button>

          <button
            style={{
              width: 70,
              height: 50,
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
                fontWeight: "normal",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              🚚
            </h1>
            <h1 style={{ fontSize: "9px", fontWeight: "normal" }}>Moving</h1>
          </button>
        </div>

        <h1
          style={{
            textAlign: "left",
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "normal",
          }}
        >
          Job Title
        </h1>
        <input
          style={{
            marginLeft: "15px",
            marginBottom: "40px",
            borderColor: "#d1d5dc",
            borderRadius: "5px",
            borderWidth: "1.9px",
            borderStyle: "solid",
            width: "400px",
            height: "25px",
          }}
        ></input>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 20,
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              textAlign: "left",
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: "normal",
            }}
          >
            Date and Time
          </h1>
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* The Icon */}
            <IoCalendarOutline
              style={{
                position: "absolute",
                left: "25px" /* Adjust this to move icon inside */,
                top: "40%",
                transform: "translateY(-50%)",
                fontSize: "13px",
                pointerEvents:
                  "none" /* So clicking the icon still focuses the input */,
              }}
            />

            {/* The Input */}
            <input
              placeholder="mm/dd/yyyy"
              style={{
                marginLeft: "15px",
                borderColor: "#d1d5dc",
                borderRadius: "5px",
                borderWidth: "1.9px",
                borderStyle: "solid",
                width: "120px",
                height: "25px",
                paddingLeft:
                  "20px" /* Extra space so text doesn't overlap the icon */,
                outline: "none",
              }}
            />
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            {/* The Icon */}
            <IoTimeOutline
              style={{
                position: "absolute",
                left: "25px" /* Adjust this to move icon inside */,
                top: "40%",
                transform: "translateY(-50%)",
                fontSize: "13px",
                pointerEvents:
                  "none" /* So clicking the icon still focuses the input */,
              }}
            />

            {/* The Input */}
            <input
              placeholder="00:00"
              style={{
                marginLeft: "15px",
                borderColor: "#d1d5dc",
                borderRadius: "5px",
                borderWidth: "1.9px",
                borderStyle: "solid",
                width: "120px",
                height: "25px",
                paddingLeft:
                  "10px" /* Extra space so text doesn't overlap the icon */,
                outline: "none",
              }}
            />
          </div>
        </div>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 60,
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              textAlign: "left",
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: "normal",
            }}
          >
            Budget
          </h1>
          <input
            placeholder="Enter your Budget"
            style={{
              marginLeft: "15px",
              borderColor: "#d1d5dc",
              borderRadius: "5px",
              borderStyle: "solid",
              borderWidth: "1.9px",
              width: "200px",
              height: "25px",
            }}
          ></input>
        </div>

        <h1
          style={{
            textAlign: "left",
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "normal",
          }}
        >
          Location
        </h1>
        <input
          placeholder="Enter Location"
          style={{
            marginLeft: "15px",
            borderColor: "#d1d5dc",
            borderRadius: "5px",
            borderWidth: "1.9px",
            borderStyle: "solid",
            width: "400px",
            height: "25px",
            marginBottom: "30px",
          }}
        ></input>

        <h1
          style={{
            textAlign: "left",
            fontSize: "12px",
            marginBottom: 20,
            fontFamily: "Inter",
            fontWeight: "normal",
          }}
        >
          Description
        </h1>
        <input
          placeholder="Describe the details which you need done......"
          textAlign="center"
          style={{
            marginLeft: "15px",
            borderColor: "#d1d5dc",
            borderRadius: "5px",
            borderWidth: "2px",
            borderStyle: "solid",
            width: "800px",
            height: "100px",
          }}
        ></input>
      </div>
    </>
  );
}

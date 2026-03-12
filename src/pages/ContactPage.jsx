import React, { useState } from "react";
import { Footer, Navbar } from "../components";

const ContactPage = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    alert("Message sent successfully!")

    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />

        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">

            <form onSubmit={handleSubmit}>

              <div className="form my-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>

              <div className="form my-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="form my-3">
                <label>Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                />
              </div>

              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
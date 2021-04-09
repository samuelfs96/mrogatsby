import React, { useState} from "react"
import { render } from "react-dom";
import { navigate } from "gatsby"
import { setUser } from "../services/auth"
import { useForm } from "react-hook-form";
import AirlineLogo from "../img/logo_airline-turkish.png"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


  const Signup = (props) => {

    const [agree, setAgree] = useState(false);
    const { register, watch, handleSubmit, errors, formState, unregister } = useForm({
      mode: "onBlur",
      defaultValues:{
        password: "",
        firstname: "",
        lastname: "",
        organization: "",
        department: "",
        designation: "",
        role: "",
        email: "",
        phone: "",
      }
    });
    console.log(errors);
    const CONSTANTS = require("../../CONSTANTS.json")
    const STATEMENT_URL = CONSTANTS.CORE_DOMAIN + "/pages/"

    const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  const [isAlreadyRegistered,setIsAlreadyRegistered] = useState(false);
  const [isCreated,setIsCreated] = useState(false);
  const [phoneValue, setPhoneValue]=useState("");
  const [errorMessage, setErrorMessage]=useState("");
const [emailAddress, setEmailAddress]=useState("");

  const handlePhoneNumberChange = (value, country, event, formattedValue) => {
    // alert(formattedValue);
    setPhoneValue(formattedValue);
  }

// const CONSTANTS = require("../../CONSTANTS.json")
  const REGISTER_URL = CONSTANTS.CORE_DOMAIN + "/users/users/"
  function handleSignup ( data){
    setEmailAddress(data.email);
    unregister("passwordConfirm");
    console.log("Create new user: ", data)
   // event.preventDefault()

    fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        if (!json.token) {
          const myString =JSON.stringify(json).replace("{","(").replace("}",")").replace("["," ").replace("]"," ");
          setErrorMessage(myString);
       setIsAlreadyRegistered(true) ;

        } else {
          // Redirect to the Login page after a successful registration.
          setIsCreated(true);
        }
      })
      .catch(error => {
        setIsAlreadyRegistered(true) ;
        setErrorMessage(error.message)
      })
    console.log()
  }


  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  }

    return (
      <div>
    {isCreated?(
      <form
      style={{paddingLeft: "25px",paddingRight: "25px"}}  >
      <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a>  
     
       <h4>Please confirm your email address</h4>
      
        <p >
        We have sent a confirmation email to {emailAddress}. To complete your signup, please check your emails and use confirmation link.
        </p>
      
    </form>)
    : (
        <form
          method="post"
          onSubmit={handleSubmit(
            handleSignup
          )}
          style={{paddingLeft: "25px",paddingRight: "25px"}}  >
          <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a>  
          {/*
           <img src={AirlineLogo} alt="" className="logo-airline" style={{marginTop: "15px", marginBottom: "15px"}}/> */}
           <h4>Sign Up</h4>
           {isAlreadyRegistered ? (
            <p style={{ color: `red` }}>
            Something went wrong. ({errorMessage})
            </p>
          ) : null}
           <div className="row">
            <div className="col-md-6">
              <input id="email"
              type="email"
              placeholder="Email"
              name="email"
              ref={register({
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               })}
              style={{ height: "45px", borderColor: errors.email && "red" }}
            />

          {errors.email && errors.email.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.email  && errors.email.type === "pattern" && (
            <p style={{ color: `red` }}> Please enter a valid email. </p>
          )}
          </div>
                            <div className="col-md-6">
             <input
              type="text"
              placeholder="First Name"
              name="firstname"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              style={{height: "45px",  borderColor: errors.firstname && "red" }}
            />

          {errors.firstname && errors.firstname.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.firstname  &&  errors.firstname.type === "minLength" && (
            <p style={{ color: `red` }}> This is too short </p>
          )}
          {errors.firstname  &&  errors.firstname.type === "maxLength" && (
            <p style={{ color: `red` }}> This is too long </p>
          )}
          {errors.firstname  && errors.firstname.type === "pattern" &&  (
            <p style={{ color: `red` }}> Please enter a name value</p>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="text" placeholder="Last Name"
              name="lastname" ref={register({
                required: true,
                minLength: 2,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
             style={{ height: "45px", borderColor: errors.lastname && "red" }}
            />

          {errors.lastname && errors.lastname.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.lastname  &&  errors.lastname.type === "minLength" && (
            <p style={{ color: `red` }}> This is too short </p>
          )}
          {errors.lastname  &&  errors.lastname.type === "maxLength" && (
            <p style={{ color: `red` }}> This is too long </p>
          )}

         </div>
         <div className="col-md-6">
          <input
              type="text"  placeholder="Organization"
              name="organization"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
              style={{ height: "45px", borderColor: errors.organization && "red" }}

            />
          {errors.organization && errors.organization.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.organization  &&  errors.organization.type === "minLength" && (
            <p style={{ color: `red` }}> This is too short </p>
          )}
          {errors.organization  &&  errors.organization.type === "maxLength" && (
            <p style={{ color: `red` }}> This is too long </p>
          )}

         </div>
         <div className="col-md-6">
          <input
              type="text"
              name="department" placeholder="Departament"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
              style={{ height: "45px", borderColor: errors.designation && "red" }}
              />

          {errors.department && errors.department.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.department  &&  errors.department.type === "minLength" && (
            <p style={{ color: `red` }}> This is too short </p>
          )}
          {errors.department  &&  errors.department.type === "maxLength" && (
            <p style={{ color: `red` }}> This is too long </p>
          )}

         </div>
         <div className="col-md-6">
         <input
              type="text"
              name="designation"
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
              style={{ height: "45px", borderColor: errors.designation && "red" }}
              placeholder="Designation"
            />

          {errors.designation && errors.designation.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.designation  &&  errors.designation.type === "minLength" && (
            <p style={{ color: `red` }}> This is too short </p>
          )}
          {errors.designation  &&  errors.designation.type === "maxLength" && (
            <p style={{ color: `red` }}> This is too long </p>
          )}

          </div>
          <div className="col-md-6">
            <select
              name="role"
              ref={register({
                required: true,

              })}
              style={{ height: "45px", borderColor: errors.role && "red" }}
              placeholder="Organization Type"
            >
              <option value="">-- Organization Type --</option>
              <option value="airline">Airline</option>
              <option value="mro">MRO</option>
              <option value="repair_shops">Repair Shops</option>
              <option value="labs">Labs</option>
              <option value="oems">OEMs</option>
              <option value="part_suppliers">Part Suppliers</option>
              <option value="logistics">Logistics Providers</option>
            </select>
          {errors.role && errors.role.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}

            </div>
            <div className="col-md-6">
            <input id="phone"
            type="text"
            name="phone"
            value= {phoneValue}
            style={{display: "none", }}
            ref={register({
              required: true,
             })}/>

            <PhoneInput
            id="phone2"
            name="phone2"
            onChange={handlePhoneNumberChange}
            defaultCountry={"au"}
            inputStyle={{ width: "100%", height: "45px", borderColor: errors.phone && "red" }}
            placeholder="Phone Number"
            />

          {errors.phone && errors.phone.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.phone  && errors.phone.type === "pattern" &&
            <p style={{ color: `red` }}> Please enter a valid phone number </p>
          }

         </div>
         <div className="col-md-6">
          <input id="password"
              type="password"
              name="password"
              placeholder="Password"
              ref={register({ required: true, minLength: 8})}
              style={{ height: "45px", borderColor: errors.password && "red" }}/>

          {errors.password && errors.password.type === "minLength" && (
            <p style={{ color: `red` }}>This is too short</p>
          )}
          {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
         </div>
         <div className="col-md-6">
          <input id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            ref={register({ required: true,
           validate: (value) => value ===  watch('password')|| "Passwords don't match."
          })}
          style = {{  height: "45px", borderColor: errors.passwordConfirm && "red" }}
          />
          {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
            <p style={{ color: `red` }}>This is required</p>
          )}
          {errors.passwordConfirm  &&
            <p style={{ color: `red` }}> {errors.passwordConfirm.message} </p>
          }
        </div>
      </div>
     
      <row>
       <label style={{width: '100%'}}> <input type="checkbox" id="agree" onChange={checkboxHandler} style={{width: '1em',
      height: '1em'}}/> I agree to  
     <a style={{ textDecoration: "underline" }} onClick={() => openInNewTab(STATEMENT_URL)}> Data Privacy statement.</a></label>
     </row>
     
      <row>
      <button className={agree?"btn-airline":"btn-airline-disable"} style={{cursor: (!agree ? "none":(formState.isSubmitting?"progress": "pointer") )}} disabled={!agree}>REGISTER</button>
      </row>
         <row>
         <p>Already have an account?
         <a style={{ textDecoration: "underline" }} onClick={props.onClickLogin}> Login</a>
       </p>
         </row>
        
        </form>
    )}
        </div>
    );
      };

export default Signup

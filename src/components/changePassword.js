import React, { useState} from "react"
import { render } from "react-dom";
import { navigate } from "gatsby"
import { setUser } from "../services/auth"
import { useForm } from "react-hook-form";
import AirlineLogo from "../img/logo_airline-turkish.png"


  function ChangePassword (props) {

    const { register, watch, handleSubmit, errors, formState, unregister } = useForm({
      mode: "onBlur",
      defaultValues:{
        password: "",

      }
    });
    console.log(errors);

  const [isFailed,setIsFailed] = useState(false);

  const[isSuccefullySent, setIsSuccefullySent]=useState(false)
  const [errorMessage,setErrorMessage]=useState("")
   
  const handleOk = event => {
    event.preventDefault();

    navigate(`/`)
  }
const CONSTANTS = require("../../CONSTANTS.json")
  const CHANGEPASSWORLD_URL = CONSTANTS.CORE_DOMAIN + "/reset_password/confirm/"

  function handleChangePassword ( data){
    unregister("passwordConfirm");
    console.log("Create new password: ", data)


    fetch(CHANGEPASSWORLD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      response.json().then(json => {
        // alert(response.status)
        if (response.status === 200) {
          setIsSuccefullySent(true);


        }else{
          // alert("not 200")
          setIsSuccefullySent(false);
          setIsFailed(true);
          const myString = json.password.reduce((accumulator, item) =>
          accumulator ? `${accumulator} ${item}` : `${item}`, null);
          setErrorMessage( myString);

        // alert(this.state.errorMessage)
        if(errorMessage===""){
          setErrorMessage ("Something went wrong.");
         }


      }
      })
  })
  .catch(error => {
    // alert(error)
    setIsSuccefullySent(false);
    setIsFailed(true);
    setErrorMessage(error.message);
  })
  }




    return (
      <div>
      {isSuccefullySent?
        <form method="get" onSubmit={handleOk}>
        <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a>  
         {/* <img src={AirlineLogo} alt="" className="logo-airline" /> */}
          <p>
            Your password successfully updated. Please Login
          </p>

          <button className="btn-airline" >Ok </button>
        </form>
        :
        <form
          method="post"
          onSubmit={handleSubmit(
            handleChangePassword
          )}
          style={{paddingLeft: "25px",paddingRight: "25px"}}  >
          <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a> 
         {/*  <img src={AirlineLogo} alt="" className="logo-airline" style={{marginTop: "15px", marginBottom: "15px"}}/> */}
           <h4>Reset your password</h4>
           {isFailed ? (
            <p style={{ color: `red` }}>
            {errorMessage} Please try again.
            </p>
          ) : null}

          <input id="token"
          type="text"
          value={props.token}
          name="token"
          ref={register({ required: true,})}
          style={{ display: "none"}}/>
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


          <button className="btn-airline" disabled={formState.isSubmitting}>Create New Password</button>
        </form>  }
        </div>
    );
      };

export default ChangePassword

import React from "react"

class SaveReset extends React.Component {
  state = {
    email: props.email
  
  }



  render(props) {
    let result;
  try {
    // check and make sure the email exists
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    // If the user exists, save their password hash
    const timeInMs = Date.now();
    const hashString = `${req.body.email}${timeInMs}`;
    const secret = 'alongrandomstringshouldgohere';
    const hash = crypto.createHmac('sha256', secret)
                       .update(hashString)
                       .digest('hex');
    foundUser.passwordReset = hash;

    foundUser.save((err) => {
      if (err) {     <p style={{ color: `red` }}>Something went wrong while attempting to reset your password. Please Try again</p>  }
      <p style={{ color: `green` }}>We have sent you an email that will allow you to reset your password. Please check your email. </p>  }
    );
  } catch (err) {
    // if the user doesn't exist, error out
    <p style={{ color: `red` }}>Something went wrong while attempting to reset your password. Please Try again </p>
  }
  return;
  }
}

export default SaveReset

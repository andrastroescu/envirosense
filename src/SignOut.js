import React from 'react';
import { NavLink } from 'react-router-dom';

const SignOut = () => {

  return (

    <section className="main-content ">
       <p className="text-sm text-center" style={{margin: 10}}>
        <h4> Bye for now, <br/> thanks for your green impact! </h4> <br/> <br/>
        Already have an account?{' '}
                            <NavLink to="/login">
                                Sign in
                            </NavLink>
       </p>
    </section>
  );
};

export default SignOut;
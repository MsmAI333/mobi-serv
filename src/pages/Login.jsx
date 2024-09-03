import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from 'react-icons/fc';
import Navigation from '../components/Navigation';

const Login = () => {
  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center"
            >
              <FcGoogle className="mr-2" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Navigation />
      </div>
    </div>
  );
};

export default Login;
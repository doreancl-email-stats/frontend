import Link from "next/link";
import React from "react";
import Image from "next/image";
import { API_URL_LOGIN } from "../../config";

export default function Login() {
  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Phone image"
                width={500}
                height={500}
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <Link href={API_URL_LOGIN} passHref={true}>
                <button
                  aria-label="Continue with google"
                  role="button"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
                >
                  <Image
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
                    alt="google"
                    width={30}
                    height={30}
                  />
                  <p className="text-base font-medium ml-4 text-gray-700">
                    Continue with Google
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Script from "next/script";
import { useEffect, useState } from "react";

const { NEXT_PUBLIC_GOOGLE_ID } = process.env;
const { NEXT_PUBLIC_RUN_MODE } = process.env;

const config = {
  enable: true,
  methods: {
    renderButton: true,
    renderPrompt: true,
  },
};

const GoogleAuth = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [hasGoogle, setHasGoogle] = useState<boolean>(false);

  function handleCredentialResponse(response) {
    console.log(`Encoded JWT ID token: ${response.credential}`);
  }

  function loadGoogle() {
    console.log('loadGoogle');
    if (config.enable === false) {
      return;
    }

    const { google } = window;
    console.log('INITIALIZING GOOGLE AUTH');
    google.accounts.id.initialize({
      client_id: NEXT_PUBLIC_GOOGLE_ID,
      callback: handleCredentialResponse,
    });
    if (config.methods.renderPrompt) {
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
    return;
    if (config.methods.renderButton) {
      google.accounts.id.renderButton(
        document.getElementById('googleRenderButton'),
        { theme: 'outline', size: 'large' } // customization attributes
      );
    }
    if (config.methods.renderPrompt) {
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  }

  function tryLoadGoogle() {
    if (
      !config.enable ||
      !hasMounted ||
      !hasGoogle ||
      undefined === window.google
    ) {
      if (NEXT_PUBLIC_RUN_MODE === 'debbug') {
        console.log(
          'tring to load google',
          config,
          { hasMounted },
          { hasGoogle },
          { hasWindow: undefined !== window.google }
        );
      }
      return;
    }
    loadGoogle();
  }

  useEffect(() => {
    setHasMounted(true);
    tryLoadGoogle();
  }, [hasGoogle]);

  if (config.enable === false) {
    return null;
  }

  return (
    <>
      <h1>holi</h1>
      <h1>hasMounted {hasMounted ? 'yes' : 'no'}</h1>
      <h1>hasGoogle {hasGoogle ? 'yes' : 'no'}</h1>

      <>
        <div id="googleRenderButton"></div>
      </>
      {false && config.methods.renderButton && (
        <>
          <div
            id="g_id_onload"
            data-client_id={NEXT_PUBLIC_GOOGLE_ID}
            data-login_uri="http://localhost:8080/"
            data-auto_prompt={config.methods.renderPrompt ? 'true' : 'false'}
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left"
          ></div>
        </>
      )}

      {config.enable && (
        <Script
          id="google-gsi-js"
          src="https://accounts.google.com/gsi/client"
          onError={(err) => console.log(err)}
          onLoad={() => {
            console.log('loaded google');
            setHasGoogle(true);
          }}
        />
      )}
    </>
  );
};
export default GoogleAuth;

import styles from "./nav.module.css"
import { signOut } from "../lib/auth";
import useUser from "../lib/useUser";

export function NavAuth() {

  const user = useUser();

  let status = ''
  let session = null

  if (user) {
    status = ''
    session = { user: user }
  }

  const loading = status === 'loading'

  return <div className="relative">
    <p
      className={`nojs-show ${
        !session && loading ? styles.loading : styles.loaded
      }`}
    >
      {!session && (
        <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
          <a
            // href={`/api/auth/signin`}
            href={`http://localhost:3000/auth/google`}
            className={styles.buttonPrimary}
            // onClick={(e) => {e.preventDefault(signIn()}}
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
              <span
                style={{ backgroundImage: `url(${session.user.profile.photos[0].value})` }}
                className={styles.avatar}
              />
          <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br/>
                <strong>{session.user.profile.emails[0].value || session.user.profile.displayName}</strong>
              </span>
          <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign out
          </a>
        </>
      )}
    </p>

  </div>;
}
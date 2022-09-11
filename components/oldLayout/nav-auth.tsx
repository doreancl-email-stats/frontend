import { signOut } from "../../lib/auth";
import styles from "./nav.module.css";
import useGetSession from "../../lib/hooks-users";

export function NavAuth() {
  const [session] = useGetSession({});
  const status = "loading1";

  const loading = status === "loading";

  return (
    <div className="relative">
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
        {session && session.user && (
          <>
            <span
              style={{
                //backgroundImage: `url(${session?.user?.profile.photos[0].value})`,
                backgroundImage: `url(https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80)`,
              }}
              className={styles.avatar}
            />
            <span className={styles.signedInText}>
              <small>Signed in as</small>
              <br />
              <strong>
                {session?.user?.profile.emails[0].value ||
                  session.user.profile.displayName}
              </strong>
            </span>
            <a
              href={`/api/auth/signout`}
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
      </p>
    </div>
  );
}

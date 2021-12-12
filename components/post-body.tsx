import styles from './post-body.module.css'
import {FunctionComponent} from "react";

const PostBody: FunctionComponent<{ content: any }> = ({content}) => (
  <div className="max-w-2xl mx-auto">
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{__html: content}}
    />
  </div>
);
export default PostBody

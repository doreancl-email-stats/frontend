import {GetServerSideProps} from "next";
import {deleteLink, getPostAndMorePosts} from "../../lib/api";
import {useState} from "react";
import {useRouter} from "next/router";
import Form from "../../components/oldLayout/form";
import {Content} from "../../components/oldLayout/content";
import {LinkType} from "../../types/types";

type Props = {
  slug: string
  linkForm: LinkType
}

const UpdateLink = ({slug, linkForm}: Props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const handleDeleteLink = async (event: any) => {
    event.preventDefault()
    try {
      const [status, error] = await deleteLink(slug)

      console.log({status, error})
      // Throw error with status code in case Fetch API req failed

      router.push('/')
    } catch (error) {
      console.log(error)
      setMessage('Error al eliminar el Link')
    }
  };

  return <Content>
    <div className="mt-4">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">Editar Link</h2>

        <div className="flex justify-end mt-4">
          <button onClick={handleDeleteLink}
                  className="mr-2 px-4 py-2 text-gray-200 bg-red-500 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Eliminar
          </button>
        </div>

        <Form formId="update-link-form" linkForm={linkForm} forNewLink={false}/>

        <p>{message}</p>
      </div>
    </div>
  </Content>

}

export default UpdateLink

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const [data] = await getPostAndMorePosts(params?.slug as string)
  return {
    props: {
      slug: params?.slug,
      linkForm: data,
    },
  }
};


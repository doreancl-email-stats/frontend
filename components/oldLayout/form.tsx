import {useState} from 'react'
import {useRouter} from 'next/router'
import {mutate} from 'swr'
import {LinkType} from "../../types/types";
import LinkFormInput from "./linkFormInput";
import {postLink, putLink} from "../../lib/api";
import Link from "next/link";

type Props = {
  formId: string,
  linkForm: LinkType,
  forNewLink?: boolean,
}

const Form = ({formId, linkForm, forNewLink = true}: Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [link, setLink] = useState({
    title: linkForm.title,
    link: linkForm.link,
    long_url: linkForm.long_url,
    createdAt: linkForm.createdAt,
    is_active: linkForm.is_active,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (link: LinkType) => {
    try {
      const {slug} = router.query
      const [newLink, error] = await putLink(slug, JSON.stringify(link))

      // Throw error with status code in case Fetch API req failed
      if (error) {
        throw new Error(error)
      }
      mutate(`/api/links/${slug}`, newLink, false) // Update the local data without a revalidation
      //router.push('/')
    } catch (error) {
      setMessage('Error al crear el Link posibles motivos: Puede estar en uso el link')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (link: LinkType) => {
    try {
      const [newLink, error] = await postLink(JSON.stringify(link))

      // Throw error with status code in case Fetch API req failed
      if (error) {
        throw new Error(error)
      }

      router.push('/')
    } catch (error) {
      console.log(error)
      setMessage('Error al crear el Link posibles motivos: Puede estar en uso el link')
    }
  }

  const handleChange = (e: any) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setLink({
      ...link,
      [name]: value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewLink ? postData(link) : putData(link)
    } else {
      setErrors(errs)
    }
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: any = {}
    if (!link.title) err.title = 'Titulo es requerido'
    if (!link.link) err.link = 'Link es requerido'
    if (!link.long_url) err.long_url = 'Url es requerida'
    return err
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <LinkFormInput onChange={handleChange} label={'Title'} name={'title'} value={link.title}/>
          <LinkFormInput onChange={handleChange} label={'Short Url'} name={'link'} value={link.link}/>
          <LinkFormInput onChange={handleChange} label={'Long Url'} name={'long_url'} value={link.long_url}/>
        </div>
        <div className="flex justify-between mt-4">
          <Link as={`/`} href="/pages" passHref>
            <button className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Volver
            </button>
          </Link>
          <button type="submit"
                  className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Guardar
          </button>
        </div>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          // @ts-ignore
          <li key={index}>{errors[err]}</li>
        ))}
      </div>
    </>
  )
}

export default Form

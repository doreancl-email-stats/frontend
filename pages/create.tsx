import Form from '../components/oldLayout/form'
import {Content} from "../components/oldLayout/content";
import {LinkType} from "../types/types";

const CreateLink = () => {
  const petForm: LinkType = {
    createdAt: "", is_active: true,
    title: '',
    link: '',
    long_url: ''
  }

  return <Content>
    <div className="mt-4">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">Crear Link</h2>
        <Form formId="create-link-form" linkForm={petForm}/>
      </div>
    </div>
  </Content>

}

export default CreateLink

import { Link } from 'react-router-dom'
import { Result } from 'antd'
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <Result status="404" />
      <h1 className="text-6xl font-bold text-brightGray">404</h1>
      <p className="mt-3 text-xl text-midGray">صفحه مورد نظر یافت نشد!</p>
      <div className=" flex flex-col md:flex-row gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-bluePurpleBackground text-bluePurple rounded-lg hover:bg-bluePurple hover:text-bluePurpleBackground transition-all"
        >
          بازگشت به صفحه اصلی
        </Link>
        <Link
          to="/"
          className="px-6 py-3 bg-success text-white rounded-lg hover:bg-green-700 transition-all text-center"
        >
          تماس با پشتیبانی
        </Link>
      </div>
    </div>
  )
}

export default NotFound

import headerImage from '../../../assets/images/Landing/headerimg.svg'
import { GiftFilled } from '@ant-design/icons'
import { Image } from 'antd'
const Header = () => {
  return (
    <section
      id="header"
      className="grid lg:grid-cols-10 gap-4 container mx-auto px-4 lg:mt-28 w-4/5"
    >
      <div className="left-wrapper lg:col-span-6 flex flex-col items-center justify-center">
        <Image
          className="h-[24rem] lg:h-[35rem] "
          src={headerImage}
          alt="Header Illustration"
        />
      </div>

      <div className="right-wrapper lg:col-span-4 flex flex-col items-end justify-center">
        <a
          href="#"
          className="bg-white text-mypink rounded-3xl shadow-glow px-6 py-2 flex justify-center items-center gap-4"
        >
          <span className="text-sm lg:text-base">هدیه ای به کل ایران</span>
          <GiftFilled />
        </a>
        <h1 className="text-3xl lg:text-[60px] leading-10 lg:leading-[5rem] my-8 font-bold text-center lg:text-right">
          بزرگترین مرجع <span className="text-mypink">رزرو بلیط </span> در ایران
        </h1>
        <p className="text-neutrals4-75 text-justify lg:text-right">
          وبسایت رزرو بلیط جاییه که می‌تونی راحت و سریع بلیط مسافرتی و تورهای
          مختلف رو رزرو کنی. با پیشنهادهای ویژه و پشتیبانی عالی، سفر رو برات
          آسون و بی‌دغدغه می‌کنیم.
        </p>
      </div>
    </section>
  )
}

export default Header

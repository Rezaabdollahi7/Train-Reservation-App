import travelImage from '../../../assets/images/Landing/Group9238.png'
import { Image } from 'antd'
const TravelPoint = () => {
  return (
    <section id="travel-point" className="grid grid-cols-12 py-32">
      {/* Image Container */}
      <div className="img-container col-span-12 lg:col-span-7">
        <Image className="w-full" src={travelImage} alt="Travel Point" />
      </div>

      {/* Text Content */}
      <div className="points-text flex justify-center items-start flex-col col-span-12 lg:col-span-5 px-6 mt-5 lg:mt-0 lg:pr-8">
        <h4 className="text-softBlue font-bold text-xl">خرید بلیط قطار</h4>
        <h6 className="my-5 text-purpleHaze">
          ما بهتون کمک میکنیم تا بهترین تور هارو پیدا کنید
        </h6>
        <p className="text-purpleHaze text-lg lg:w-4/5">
          خرید بلیط قطار هرساله به نسبت سال قبل محبوبیت بیشتری پیدا می‌کند؛
          ایمنی بالا، مقرون به‌صرفه بودن و امکانات خوب از ویژگی‌های یک وسیله
          نقلیه ایده آل برای سفر است و قطار همه این مشخصه‌ها را به طور هم‌زمان
          با‌هم دارد. با فراهم شدن امکان خرید اینترنتی بلیط قطار نیز شما
          می‌توانید به کمک سفرمارکت در کوتاه‌ترین زمان ممکن بلیط قطار مدنظر
          خودتان را رزرو کنید. تقویم قیمتی، امکان مشاهده ظرفیت، شرکت‌های ریلی
          متنوع، بیشترین ظرفیت فروش و بهترین قیمت تنها بخشی از مزیت‌های رزرو
          بلیط قطار از سفرمارکت است.
        </p>

        {/* Statistics Section */}
        <div className="items-container grid grid-cols-2 mt-5 gap-10 relative">
          {[
            { label: 'مشتری', value: '+1000' },
            { label: 'تعاونی', value: '+36' },
            { label: 'قطار', value: '+320' },
            { label: 'کاربر', value: '+1000' },
          ].map((item, index) => (
            <div
              key={index}
              className="item p-4 rounded-2xl border border-gray-300 flex flex-col justify-center items-center px-12"
            >
              <span className="font-semibold text-xl text-[#FF5722]">
                {item.label}
              </span>
              <span className="mt-2">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelPoint

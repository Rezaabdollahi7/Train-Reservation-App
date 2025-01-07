import Logo from '../../assets/icons/train-icon.svg'
import {
  YoutubeFilled,
  GithubFilled,
  InstagramFilled,
  XOutlined,
} from '@ant-design/icons'

const Footer = () => {
  const links = [
    {
      title: 'اطلاعات تکمیلی',
      items: [
        { label: 'فروش سازمانی', href: '#' },
        { label: 'همکاری با ما', href: '#' },
        { label: 'فرصت‌های شغلی', href: '#' },
      ],
    },
    {
      title: 'پشتیبانی',
      items: [
        { label: 'قیمت‌ها', href: '#' },
        { label: 'مستندات', href: '#' },
        { label: 'راهنمای خرید بلیط', href: '#' },
        { label: 'درخواست API', href: '#' },
      ],
    },
    {
      title: 'سوئیفت ریل',
      items: [
        { label: 'درباره ما', href: '#' },
        { label: 'بلاگ', href: '#' },
        { label: 'تماس با ما', href: '#' },
        { label: 'بیمه مسافرتی', href: '#' },
        { label: 'چرا سوئیفت ریل؟', href: '#' },
      ],
    },
    {
      title: 'خدمات مشتریان',
      items: [
        { label: 'مرکز پشتیبانی آنلاین', href: '#' },
        { label: 'قوانین و مقررات', href: '#' },
        { label: 'راهنمای استرداد', href: '#' },
      ],
    },
  ]

  return (
    <footer
      className="bg-[#f3f1ff] px-6 container"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl  pb-8 pt-12 sm:pt-24  lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 ">
          <img className="h-16 w-16" src={Logo} alt="Company logo" />
          <div className="mt-16 grid grid-cols-2 gap-8 col-span-2  xl:grid-cols-4   xl:mt-0  ">
            {links.map((section, idx) => (
              <div
                key={idx}
                className="md:grid md:grid-cols-2  md:gap-8 lg:grid-cols-1 text-start"
              >
                <div>
                  <h3 className="text-sm lg:text-lg font-semibold leading-6 text-brightGray ">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.items.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-midGray hover:text-crocusPurple"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm lg:text-lg font-semibold leading-6 text-orange-500 text-start">
              ساده‌تر با اپلیکیشن سوئیفت ریل
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-800">
              برای اینکه از تخفیف‌های ویژه ما باخبر بشی، بهتره که اپ ما رو نصب
              کنی.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0 gap-5">
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border border-purple-700 bg-purple-100 px-3 py-1.5 text-base text-black shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
              placeholder="شمارتو بده ببینم :)"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                ارسال لینک دانلود
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between ">
          <div className="flex  md:order-2 gap-6 lg:px-4 justify-center lg:justify-normal">
            <a href="#" className="text-gray-500 hover:text-gray-400 ">
              <InstagramFilled className="text-xl hover:text-gray-400   text-gray-500" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 ">
              <XOutlined className="text-xl hover:text-gray-400   text-gray-500" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 ">
              <YoutubeFilled className="text-xl hover:text-gray-400   text-gray-500" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 ">
              <GithubFilled className="text-xl hover:text-gray-400   text-gray-500" />
            </a>
          </div>

          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            کلیه حقوق این سرویس (وب‌سایت و اپلیکیشن‌های موبایل) محفوظ و متعلق به
            سوئیفت ریل می‌باشد. (نسخه 1.1.0)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

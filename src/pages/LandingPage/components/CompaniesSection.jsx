import { Button } from 'antd'
import SafarSeirLogo from '../../../assets/images/companies/safar-seir.png'
import Logo724 from '../../../assets/images/companies/724.png'
import safarLogo from '../../../assets/images/companies/safar.png'
import IranPayamLogo from '../../../assets/images/companies/iran-payam-noo.png'
import MahanSafarLogo from '../../../assets/images/companies/mahan-safar.png'

const CompaniesSection = () => {
  const companies = [
    { src: SafarSeirLogo, alt: 'safar-seir' },
    { src: Logo724, alt: '724 logo' },
    { src: safarLogo, alt: 'safar-logo' },
    { src: IranPayamLogo, alt: 'iran-payam' },
    { src: MahanSafarLogo, alt: 'mahan-safar' },
  ]

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {companies.map((company, index) => (
            <img
              key={index}
              className={`max-h-16 w-full object-contain ${
                index >= 4 ? 'hidden sm:block' : ''
              }`}
              src={company.src}
              alt={company.alt}
              width="158"
              height="48"
            />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <p className="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
            <span className="hidden md:inline">
              ما با 25 تا از بهیترین های ایران داریم رفاقت میکنیم .{' '}
            </span>
            <Button type="link" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true"></span> اگه
              خواستی توام همکارمون شو <span aria-hidden="true">&rarr;</span>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompaniesSection

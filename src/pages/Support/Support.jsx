import { useState, useEffect } from 'react'
import {
  Tabs,
  Skeleton,
  Collapse,
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Divider,
} from 'antd'
import { LuShieldQuestion } from 'react-icons/lu'
import {
  PhoneOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons'

import { HappyProvider } from '@ant-design/happy-work-theme'
const { TabPane } = Tabs
const { Panel } = Collapse
const { Option } = Select

const SupportPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const genExtra = () => <LuShieldQuestion className="w-6 h-6" />

  const faqItems = [
    {
      key: '1',
      label: 'چگونه می‌توانم حساب کاربری خود را ایجاد کنم؟',
      children: (
        <div>
          برای ایجاد حساب کاربری، از منوی <strong>ثبت‌نام</strong> در صفحهٔ اصلی
          استفاده کنید. پس از وارد کردن ایمیل و رمز عبور معتبر، حساب شما ایجاد
          خواهد شد.
        </div>
      ),
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'چگونه می‌توانم رمز عبور خود را بازیابی کنم؟',
      children: (
        <div>
          از لینک <strong>فراموشی رمز عبور</strong> در صفحه ورود استفاده کنید.
          ایمیل بازیابی رمز عبور برای شما ارسال می‌شود.
        </div>
      ),
      extra: genExtra(),
    },
    {
      key: '3',
      label: 'آیا امکان پرداخت آنلاین وجود دارد؟',
      children: (
        <div>
          بله، از طریق درگاه پرداخت اینترنتی می‌توانید پرداخت خود را انجام دهید.
          در صورت بروز مشکل، با پشتیبانی تماس بگیرید.
        </div>
      ),
      extra: genExtra(),
    },
    {
      key: '4',
      label: 'چگونه بلیط خریده شده را کنسل کنم؟',
      children: (
        <div>
          برای کنسلی بلیط، به صفحهٔ <strong>استرداد بلیط</strong> مراجعه کنید و
          مشخصات بلیط خود را وارد کنید.
        </div>
      ),
      extra: genExtra(),
    },
    {
      key: '5',
      label: 'چگونه می‌توانم وضعیت بلیط خود را پیگیری کنم؟',
      children: (
        <div>
          با وارد شدن به بخش <strong>بلیط‌های من</strong> یا از طریق ایمیل
          اطلاع‌رسانی می‌توانید وضعیت بلیط‌ها را دنبال کنید.
        </div>
      ),
      extra: genExtra(),
    },
  ]

  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  const onFinish = () => {
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      message.success('تیکت شما با موفقیت ارسال شد.')
      form.resetFields()
    }, 2000)
  }

  const TicketForm = () => (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold text-info mb-4">ارسال تیکت</h2>
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Card style={{ border: 0 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'لطفاً ایمیل خود را وارد کنید.',
                },
                {
                  type: 'email',
                  message: 'آدرس ایمیل معتبر نیست.',
                },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="you@example.com"
              />
            </Form.Item>

            <Form.Item
              label="موضوع"
              name="subject"
              rules={[{ required: true, message: 'لطفاً موضوع را وارد کنید.' }]}
            >
              <Input
                size="large"
                prefix={<ExclamationCircleOutlined />}
                placeholder="موضوع تیکت"
              />
            </Form.Item>

            <Form.Item
              label="دپارتمان"
              name="department"
              rules={[
                {
                  required: true,
                  message: 'لطفاً دپارتمان مربوطه را انتخاب کنید.',
                },
              ]}
            >
              <Select placeholder="انتخاب دپارتمان">
                <Option value="support">پشتیبانی</Option>
                <Option value="sales">فروش</Option>
                <Option value="billing">مالی</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="توضیحات"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'لطفاً توضیحات خود را وارد کنید.',
                },
              ]}
            >
              <Input.TextArea
                prefix={<MessageOutlined />}
                rows={4}
                placeholder="شرح کامل مشکل یا درخواست خود را اینجا وارد کنید..."
              />
            </Form.Item>

            <Divider />

            <Form.Item>
              <HappyProvider>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<SendOutlined />}
                  className="font-semibold "
                >
                  ارسال تیکت
                </Button>
              </HappyProvider>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  )

  return (
    <>
      <div className=" py-12 ">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          <Tabs className="w-full ">
            <TabPane
              tab={
                <span className="flex items-center space-x-4   ">
                  <PhoneOutlined />
                  <span>تماس با ما</span>
                </span>
              }
              key="1"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-info mb-4">
                  تماس با پشتیبانی
                </h2>
                {loading ? (
                  <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                  <>
                    <p className="text-midGray mb-4">
                      برای تماس با پشتیبانی، می‌توانید از طریق شماره‌های زیر با
                      ما در ارتباط باشید:
                    </p>
                    <ul className="list-disc ps-4  mb-4">
                      <li className="text-midGray">
                        شماره تماس ۱: ۰۲۱-۱۲۳۴۵۶۷
                      </li>
                      <li className="text-midGray">
                        شماره تماس ۲: ۰۹۱۲-۱۲۳۴۵۶۷
                      </li>
                    </ul>
                    <p className="text-midGray mb-2">
                      ساعات پاسخگویی: شنبه تا چهارشنبه، ۹ صبح تا ۵ بعدازظهر
                    </p>
                    <p className="text-midGray">
                      در صورت تماس خارج از ساعات اداری، می‌توانید از طریق ارسال
                      تیکت یا ایمیل اقدام کنید.
                    </p>
                  </>
                )}
              </div>
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center space-x-4   ">
                  <MailOutlined />
                  <span>ارسال ایمیل</span>
                </span>
              }
              key="2"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-info mb-4">
                  ارسال ایمیل به پشتیبانی
                </h2>
                {loading ? (
                  <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                  <>
                    <p className="text-midGray mb-4">
                      برای ارسال ایمیل به پشتیبانی، می‌توانید از آدرس ایمیل زیر
                      استفاده کنید:
                    </p>
                    <p className="text-midGray mb-4">
                      <strong>ایمیل پشتیبانی:</strong> support@example.com
                    </p>
                    <p className="text-midGray mb-4">
                      لطفاً در هنگام ارسال ایمیل، موضوع و توضیحات خود را به طور
                      کامل وارد کنید تا کارشناسان ما در اسرع وقت پاسخگو باشند.
                    </p>
                    <p className="text-midGray">
                      همچنین می‌توانید اطلاعات تماس و شماره سفارش خود را در
                      ایمیل بگنجانید تا روند پیگیری سریع‌تر انجام شود.
                    </p>
                  </>
                )}
              </div>
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center space-x-4   ">
                  <QuestionCircleOutlined />
                  <span>سوالات متداول</span>
                </span>
              }
              key="3"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-info mb-4">
                  سوالات متداول
                </h2>
                {loading ? (
                  <Skeleton active paragraph={{ rows: 5 }} />
                ) : (
                  <>
                    <Collapse defaultActiveKey={['1']} className="bg-white">
                      {faqItems.map((item) => (
                        <Panel
                          header={item.label}
                          key={item.key}
                          extra={item.extra}
                          className="mb-2 rounded-lg text-base font-semibold"
                        >
                          <div className="text-purpleHaze font-normal">
                            {item.children}
                          </div>
                        </Panel>
                      ))}
                    </Collapse>
                  </>
                )}
              </div>
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center space-x-4   ">
                  <MessageOutlined />
                  <span>ارسال تیکت</span>
                </span>
              }
              key="4"
            >
              <TicketForm />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default SupportPage

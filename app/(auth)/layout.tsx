import Image from 'next/image'
import Link from 'next/link'

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-yellow-100">
      <div className="flex min-h-screen flex-col items-center justify-center bg-auth-layout">
        <div className="min-w-80 rounded-lg bg-white p-8 shadow-md">
          <Link href={'/'} className="mb-4 flex justify-center">
            <Image src={'/images/logo.svg'} alt="logo" width={40} height={40} />
          </Link>

          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

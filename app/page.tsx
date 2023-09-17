import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ReportDialog from '@/components/home/ReportDialog/ReportDialog'
import ReportGrid from '@/components/home/ReportGrid'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header />
      <ReportGrid />
      <Footer />
    </>
  )
}

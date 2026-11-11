import type { Metadata } from 'next'
import StudioHome from '@/components/StudioHome'
import JsonLd from '@/components/JsonLd'
import AnimatedTabTitle from '@/components/AnimatedTabTitle'

export const metadata: Metadata = {
  title: { absolute: 'Rhodai | Website Design' },
}

export default function Home() {
  return <><JsonLd /><StudioHome /><AnimatedTabTitle /></>
}

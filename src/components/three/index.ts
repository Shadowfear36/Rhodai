import dynamic from 'next/dynamic'

export const NeuralNetwork = dynamic(() => import('./NeuralNetwork'), { ssr: false })
export const ServiceIcon3D = dynamic(() => import('./ServiceIcon3D'), { ssr: false })
export const RadarScan = dynamic(() => import('./RadarScan'), { ssr: false })
export const SkillSphere = dynamic(() => import('./SkillSphere'), { ssr: false })

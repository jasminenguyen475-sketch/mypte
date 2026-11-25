import { ChevronRight } from 'lucide-react'
import { homeHref } from './routes'

export function Breadcrumbs({ links, current }: { links?: { label: string; href: string }[]; current: string }) {
  return <nav className="breadcrumbs" aria-label="Đường dẫn">
    <a href={homeHref}>Trang chủ</a>
    {links?.map(link => <span key={link.href}><ChevronRight size={14} aria-hidden="true" /><a href={link.href}>{link.label}</a></span>)}
    <span aria-current="page"><ChevronRight size={14} aria-hidden="true" />{current}</span>
  </nav>
}

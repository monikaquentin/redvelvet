import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Language() {
  //
  const { i18n } = useTranslation()
  const [locale, set_locale] = useState(i18n.language)

  useEffect(() => {
    set_locale(localStorage.getItem('i18nextLng').toString())
    i18n.changeLanguage(locale)
  }, [])

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value)
    window.location.reload()
  }

  return (
    <select onChange={handleChange} value={locale} className="language-select">
      <option value="en">EN</option>
      <option value="de">DE</option>
      <option value="fr">FR</option>
      <option value="id">ID</option>
      <option value="jp">JP</option>
      <option value="ru">RU</option>
    </select>
  )
}

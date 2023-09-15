function Footer() {
  return (
    <div>
      <hr className="border-t mt-4 max-w-[170px]" />
      <h2 className="text-sm text-gray-100 mt-4">&copy; {new Date().getFullYear()}</h2>
    </div>
  )
}

export default Footer

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 Text to Infographic. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary"
          >
            About Us
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  )
} 
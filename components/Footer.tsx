export function Footer() {
    return (
        <footer className="mt-8 border-t border-border pt-6 pb-2 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2026 LabInsight AI. All rights reserved.</p>
            <div className="flex items-center gap-4">
                <a href="#" className="hover:text-primary transition-colors">Support</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">API Docs</a>
            </div>
        </footer>
    )
}
"use client";
import { config } from "@/config";
import { Rss, Facebook, MessageCircle, Linkedin } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";

export const Footer: FunctionComponent = () => {
  return (
    <section className="mt-8 md:mt-16 mb-12">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © {config.blog.copyright} {new Date().getFullYear()}
        </div>
        <div className="text-xs text-muted-foreground hidden lg:block">
          <Link
            href="https://aresgn.sinda.pro/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lien vers mon portfolio
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/rss">
            <Button variant="ghost" className="p-2">
              <Rss className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://www.facebook.com/gnimares" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Button variant="ghost" className="p-2">
              <Facebook className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://wa.me/2290199323073" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Button variant="ghost" className="p-2">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://bj.linkedin.com/in/ar%C3%A8s-gnimagnon-a239353b8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Button variant="ghost" className="p-2">
              <Linkedin className="w-4 h-4" />
            </Button>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
      <div className="text-xs text-muted-foreground lg:hidden">
        <Link
          href="https://aresgn.sinda.pro/en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lien vers mon portfolio
        </Link>
      </div>

      {/* Social Media Icons for Mobile */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        <Link href="https://www.facebook.com/gnimares" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Button variant="ghost" className="p-2">
            <Facebook className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="https://wa.me/2290199323073" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <Button variant="ghost" className="p-2">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="https://bj.linkedin.com/in/ar%C3%A8s-gnimagnon-a239353b8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Button variant="ghost" className="p-2">
            <Linkedin className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

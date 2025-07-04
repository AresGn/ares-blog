"use client";
import { config } from "@/config";
import { Rss, Facebook, MessageCircle, Twitter } from "lucide-react";
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
            href="https://kloo.me/Ares-GNIMAGNON"
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
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="p-2">
              <Facebook className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://wa.me" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="p-2">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="p-2">
              <Twitter className="w-4 h-4" />
            </Button>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
      <div className="text-xs text-muted-foreground lg:hidden">
        <Link
          href="https://kloo.me/Ares-GNIMAGNON"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lien vers mon portfolio
        </Link>
      </div>

      {/* Social Media Icons for Mobile */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" className="p-2">
            <Facebook className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="https://wa.me" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" className="p-2">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" className="p-2">
            <Twitter className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

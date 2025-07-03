import React from 'react';
import { MailIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-gray-100 py-3 px-4 w-full border-t">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="mb-2 md:mb-0">
          © {new Date().getFullYear()} Euromaster - Tous droits réservés
        </div>
        <div className="flex items-center">
          <span className="mr-2">Un problème ? Contactez-nous :</span>
          <a href="mailto:jean.paul.benga@euromaster.com" className="text-[#0054A4] hover:underline flex items-center">
            <MailIcon className="w-4 h-4 mr-1" />
            jean.paul.benga@euromaster.com
          </a>
        </div>
      </div>
    </footer>;
};
import Link from 'next/link';
import classes from './Logo.module.css';
import logoUrl from '../public/logo.png';

export function Logo() {
  return (
    <Link href="/" className={classes.logo}>
      <img src={logoUrl.src} alt="Flixclusive logo" />
    </Link>
  );
}
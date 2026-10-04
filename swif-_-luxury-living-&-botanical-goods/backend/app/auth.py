"""
Authentication and security services for password hashing, session tokens, and Google OAuth 2.0.
"""
import os
import secrets
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash plaintext password using salted bcrypt algorithm."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against stored cryptographic hash."""
    return pwd_context.verify(plain_password, hashed_password)

def generate_session_token() -> str:
    """Generate high-entropy cryptographically secure random session token."""
    return secrets.token_urlsafe(32)

def generate_oauth_state() -> str:
    """Generate CSRF state token for Google OAuth flow."""
    return secrets.token_urlsafe(24)

def build_google_oauth_url(client_id: str, redirect_uri: str, state: str) -> str:
    """Construct authoritative Google OAuth 2.0 authorization endpoint URL."""
    base = "https://accounts.google.com/o/oauth2/v2/auth"
    scopes = "openid%20email%20profile"
    return f"{base}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scopes}&state={state}&access_type=offline"

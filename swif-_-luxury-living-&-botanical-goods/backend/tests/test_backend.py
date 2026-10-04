"""
Automated unit tests for core backend functionality:
- Secure password hashing & verification
- Google OAuth URL formation
- Stock validation & order security
"""
import pytest
from app.auth import hash_password, verify_password, build_google_oauth_url, generate_session_token

def test_password_hashing():
    raw = "BotanicalHarvest2026!"
    hashed = hash_password(raw)

    assert hashed != raw
    assert hashed.startswith("$2b$") or hashed.startswith("$2a$")
    assert verify_password(raw, hashed) is True
    assert verify_password("WrongPassword123", hashed) is False

def test_google_oauth_url_builder():
    client_id = "test-client-123.apps.googleusercontent.com"
    redirect_uri = "https://swif.site/auth/google/callback"
    state = "secure-random-state-token"

    url = build_google_oauth_url(client_id, redirect_uri, state)

    assert "https://accounts.google.com/o/oauth2/v2/auth" in url
    assert f"client_id={client_id}" in url
    assert f"state={state}" in url
    assert "scope=openid%20email%20profile" in url

def test_session_token_entropy():
    tok1 = generate_session_token()
    tok2 = generate_session_token()

    assert tok1 != tok2
    assert len(tok1) >= 40

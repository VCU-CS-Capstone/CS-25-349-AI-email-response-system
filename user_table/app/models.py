from sqlalchemy import String, Boolean, Integer, Column, text, TIMESTAMP
from database import Base

class Emails(Base):
    __tablename__ = "Email Data"

    # Updates itself for every new entry
    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    at_sale = Column(Boolean, server_default=text('False'))
    inventory = Column(Integer, server_default=text('0'), nullable=False)
    added_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

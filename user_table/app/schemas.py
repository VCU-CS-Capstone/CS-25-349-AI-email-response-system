from pydantic import BaseModel

class Emails(BaseModel):
    title: str
    description: str
    at_sale: bool = False
    inventory:int

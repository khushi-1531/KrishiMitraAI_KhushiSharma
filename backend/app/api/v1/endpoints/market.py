from typing import Optional
from fastapi import APIRouter, Query, status

from ....schemas.market_schema import MarketPriceResponse
from ....services.mandi_service import mandi_price_service

router = APIRouter()

@router.get(
    "/market-prices",
    response_model=MarketPriceResponse,
    status_code=status.HTTP_200_OK,
    summary="Fetch current mandi / agricultural commodity market prices",
    description=(
        "Retrieves wholesale mandi prices across Indian markets from the official data.gov.in "
        "Agmarknet repository ('Current Daily Price of Various Commodities from Various Markets'). "
        "Supports filtering by state, district, market, commodity, variety, and arrival date with pagination."
    ),
)
async def get_market_prices(
    state: Optional[str] = Query(
        None,
        description="Filter by Indian State or UT (e.g., Punjab, Maharashtra, Uttar Pradesh)",
    ),
    district: Optional[str] = Query(
        None,
        description="Filter by District name (e.g., Pune, Agra, Ludhiana)",
    ),
    market: Optional[str] = Query(
        None,
        description="Filter by specific Mandi/Market yard (e.g., Lasalgaon, Achhnera)",
    ),
    commodity: Optional[str] = Query(
        None,
        description="Filter by agricultural commodity (e.g., Wheat, Potato, Onion, Rice)",
    ),
    variety: Optional[str] = Query(
        None,
        description="Filter by commodity variety/grade (e.g., Deshi, Local, Sharbati)",
    ),
    arrival_date: Optional[str] = Query(
        None,
        description="Filter by arrival date in DD/MM/YYYY format (e.g., 17/09/2026)",
    ),
    limit: int = Query(
        20,
        ge=1,
        le=100,
        description="Number of records to return per page (1-100, default: 20)",
    ),
    offset: int = Query(
        0,
        ge=0,
        description="Number of records to skip for pagination (default: 0)",
    ),
) -> MarketPriceResponse:
    return await mandi_price_service.fetch_market_prices(
        state=state,
        district=district,
        market=market,
        commodity=commodity,
        variety=variety,
        arrival_date=arrival_date,
        limit=limit,
        offset=offset,
    )

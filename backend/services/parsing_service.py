from __future__ import annotations


class ParsingService:
    def parse(self, raw_values: list[float]) -> dict:
        return {
            "values": raw_values,
            "count": len(raw_values),
            "mean": sum(raw_values) / len(raw_values),
        }

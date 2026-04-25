class AraisException(Exception):
    """Base exception for ARAIS backend."""


class DataIngestionError(AraisException):
    pass


class PreprocessingError(AraisException):
    pass


class OODDetectionError(AraisException):
    pass


class ModelInferenceError(AraisException):
    pass


class EvaluationError(AraisException):
    pass


class StorageError(AraisException):
    pass
